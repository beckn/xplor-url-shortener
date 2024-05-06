<<<<<<< HEAD
// app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiClient } from './common/api-client'
import configuration from './config/env/env.config'
import { UrlShortnerModule } from './url-shortner/module/url-shortner.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { GrafanaLoggerService } from './grafana/service/grafana.service'
import { LoggingInterceptor } from './utils/logger-interceptor'
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    ApiClient,
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GrafanaLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
=======
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> develop
})
export class AppModule {}
