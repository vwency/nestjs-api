import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthGuard extends PassportAuthGuard('github') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean
    return canActivate
  }

  handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message || 'Unauthorized')
    }
    return user
  }
}
