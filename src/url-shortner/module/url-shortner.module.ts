import { Module } from '@nestjs/common'
import { ApiClient } from 'src/common/api-client'
import { GrafanaLoggerService } from 'src/grafana/service/grafana.service'
import { UrlShortnerController } from 'src/url-shortner/controller/url-shortner.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ShortUrlModel, ShortUrlSchema } from '../schema/short-url.schema'
import { UrlShortnerCreateService } from '../service/url-shortner-create.service'
import { UrlShortnerDeleteService } from '../service/url-shortner-delete.service'
import { UrlShortnerReadService } from '../service/url-shortner-read.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: ShortUrlModel, schema: ShortUrlSchema }]), ApiClient],
  controllers: [UrlShortnerController],
  providers: [GrafanaLoggerService, UrlShortnerCreateService, UrlShortnerReadService, UrlShortnerDeleteService],
  exports: [UrlShortnerCreateService, UrlShortnerDeleteService, UrlShortnerDeleteService],
})
export class UrlShortnerModule {}
