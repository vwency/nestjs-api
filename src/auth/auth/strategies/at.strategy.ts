import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom' // Используем passport-custom для кастомной логики
import { Request } from 'express'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super()
  }

  authenticate(req: Request) {
    const user = req.user

    if (!user) {
      return this.fail('User not found in session', 401)
    }

    this.success(user)
  }

  async validate(req: Request) {
    const user = req.user

    if (!user) {
      throw new UnauthorizedException('User not found in session')
    }

    return user
  }
}
