import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { AuthDto } from './dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Request, request } from 'express'
import { Users } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signupLocal(dto: AuthDto): Promise<Users> {
    const User = await this.prisma.users.findUnique({
      where: {
        username: dto.username,
      },
    })

    if (User) throw { message: 'User already exists' }

    const hash = await argon.hash(dto.password)
    dto.password = undefined

    request.user = { ...User }

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

  async signinLocal(dto: AuthDto): Promise<Users> {
    const User = await this.prisma.users.findUnique({
      where: { username: dto.username },
    })

    if (!User) throw new ForbiddenException('Access Denied')

    const passwordMatches = await argon.verify(User.hash, dto.password)
    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    request.user = { ...User }

    return User
  }

  async logout(req: Request): Promise<boolean> {
    req.user = undefined
    return true
  }

  async ValidateOAuthUser(dto: AuthDto): Promise<any> {
    const User = await this.prisma.users.findUnique({
      where: {
        username: dto.username,
      },
    })

    if (User) return User

    const hash = await argon.hash(dto.password)
    dto.password = undefined
    return this.prisma.users.create({
      data: {
        ...dto,
        hash: hash,
      },
    })
  }
}
