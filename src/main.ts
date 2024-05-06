<<<<<<< HEAD
/*
Written by Bhaskar Kaura
Date: 30 April, 2024
*/

import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { API_PREFIX } from './common/constants/api-constant'
async function run() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException({
          message: Object.values(validationErrors[0].constraints).join(', ').split(', ').at(0),
          error: 'Bad Request',
          statusCode: 400,
        })
      },
    }),
  )
  app.setGlobalPrefix(API_PREFIX)
  await app.listen(3000)
}

run()
=======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
>>>>>>> develop
