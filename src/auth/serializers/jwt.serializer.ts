import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

@Injectable()
export class JwtSerializer extends PassportSerializer {
  serializeUser(user: any, done: CallableFunction): void {
    done(null, {
      id: user.id,
      username: user.username,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    })
  }

  deserializeUser(payload: any, done: CallableFunction): void {
    done(null, payload)
  }
}
