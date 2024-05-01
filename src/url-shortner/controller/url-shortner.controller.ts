import { Body, Controller, Delete, Get, Param, Post, Query, Res } from '@nestjs/common'
import { UrlShortnerCreateService } from '../service/url-shortner-create.service'
import { CreateShortUrlDto } from '../dto/create-short-url.dto'
import { UrlShortnerDeleteService } from '../service/url-shortner-delete.service'
import { UrlShortnerReadService } from '../service/url-shortner-read.service'

@Controller('shortner')
export class UrlShortnerController {
  constructor(
    private readonly shortnerCreateService: UrlShortnerCreateService,
    private readonly shortnerDeleteService: UrlShortnerDeleteService,
    private readonly shortnerReadService: UrlShortnerReadService,
  ) {}

  // Creates a short url from the originalUrl and stores the record
  @Post()
  createShortUrl(@Body() shortUrlDto: CreateShortUrlDto) {
    return this.shortnerCreateService.createShortUrl(shortUrlDto.originalUrl)
  }

  // Deletes the short url record!
  @Delete('/:shortUrl')
  deleteShortUrl(@Param('shortUrl') shortUrl: string) {
    return this.shortnerDeleteService.deleteShortUrl(shortUrl)
  }

  @Get('/:hash')
  redirectShortToOriginalUrl(
    @Param('hash') hash: string,
    @Query() queryParams: { [key: string]: string[] },
    @Res() res,
  ) {
    return this.shortnerReadService.redirectShortToOriginalUrl(hash, queryParams, res)
  }
}
