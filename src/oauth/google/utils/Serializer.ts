/* eslint-disable @typescript-eslint/ban-types */

import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  serializeUser(user: any, done: (err: any, id?: any) => void) {
    console.log('Serializer User')
    done(null, user)
  }

  async deserializeUser(
    payload: any,
    done: (err: any, user: any | null) => void,
  ) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: payload.id },
    })
    console.log('Deserialize User')
    console.log(user)
    return user ? done(null, user) : done(null, null)
  }
}
