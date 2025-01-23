import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as cliColor from 'cli-color'
import IORedis from 'ioredis'
import { RedisStore } from 'connect-redis'

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
      Express-session & Redis
      `,
    )
    .setVersion('1.0.0')
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

  const redis = new IORedis(process.env.REDIS_URI || 'redis://localhost:6379')

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
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: new RedisStore({
        client: redis,
        prefix: process.env.SESSION_FOLDER,
        ttl: 7 * 24 * 60 * 60,
      }),
    }),
  )

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
