import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Nest js api')
    .setDescription(
      `nest-js boilerplate
      prismaORM 
      PostgreSQL JwtAuth`,
    )
    .setVersion('0.1.2')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })

  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        SameSite: 'Lax',
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
      },
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000)
}
bootstrap()
