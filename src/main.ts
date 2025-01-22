import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as session from 'express-session'
import * as passport from 'passport'
import * as cookieParser from 'cookie-parser'
import * as cliColor from 'cli-color'

async function bootstrap() {
  console.log(cliColor.green('✅ NestJS application is starting...'))

  console.log()

  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Nest js api')
    .setDescription(
      `
      Nest-js boilerplate
      PrismaORM 
      Postgres 
      Express-session
      `,
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

  app.use(cookieParser())

  app.use(
    session({
      secret: process.env.EXPRESS_TOKEN,
      saveUninitialized: false,
      resave: false,
      name: 'user-session',
      cookie: {
        sameSite: 'lax',
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
  .then(() => {
    console.log()

    console.log(
      cliColor.blue('🌐 Application is running on: http://localhost:3000'),
    )
    console.log()
  })
  .catch((error) => {
    console.error(cliColor.red('❌ Error during bootstrap:'), error)
  })
