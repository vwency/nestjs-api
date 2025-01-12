import { Module } from '@nestjs/common'
import { CommentsController } from './controllers/comments.controller'
import { UserService } from '../user/services/user.service'
import { CommentsService } from './services/comments.service'

@Module({
  controllers: [CommentsController],
  imports: [],
  providers: [UserService, CommentsService],
})
export class CommentsModule {}
