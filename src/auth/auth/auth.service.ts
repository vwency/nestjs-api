import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import * as argon from 'argon2'
import { AuthDto } from './dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Request } from 'express'
import { Users } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupLocal(dto: AuthDto, req: Request): Promise<Users> {
    const User = await this.prisma.users.findUnique({
      where: {
        username: dto.username,
        email: dto.email,
      },
    })

    if (User) throw { message: 'User already exists' }

    const hash = await argon.hash(dto.password)
    dto.password = undefined

    await this.saveSession(req, User)

    return this.prisma.users.create({
      data: {
        ...dto,
        hash: hash,
      },
    })
  }

  async ValidateUser(dto: AuthDto): Promise<any> {
    const User = await this.prisma.users.findUnique({
      where: { username: dto.username },
    })

    if (!User) throw new ForbiddenException('Access Denied')

    const passwordMatches = await argon.verify(User.hash, dto.password)
    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    return User
  }

  async signinLocal(dto: AuthDto, req: Request): Promise<Users> {
    const User = await this.ValidateUser(dto)

    await this.saveSession(req, User, dto.remember)

    return User
  }

  async logout(req: Request): Promise<boolean> {
    await this.destroySession(req)
    return true
  }

  async ValidateOAuthUser(dto: AuthDto, req: Request): Promise<any> {
    const User = await this.prisma.users.findUnique({
      where: {
        username: dto.username,
        email: dto.email,
      },
    })

    if (User) {
      await this.saveSession(req, User, true)
      return User
    }

    const hash = await argon.hash(dto.password)
    dto.password = undefined

    const user = await this.prisma.users.create({
      data: {
        ...dto,
        hash: hash,
      },
    })

    if (user) {
      await this.saveSession(req, User, true)
      return user
    }
    return new BadRequestException()
  }

  private async saveSession(
    req: Request,
    user: Users,
    remember?: boolean,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!remember) req.session.cookie.maxAge = 1000
      req.session.user = { ...user }
      req.session.save((err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }

  private async destroySession(req: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }
}
