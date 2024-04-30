import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ShortUrl } from '../schema/short-url.schema'
import { ShortnerErrorMessages } from '../../common/constants/error-messages'
import { getSuccessResponse } from '../../common/constants/get-success-response'
import { HttpResponseMessage } from '../../common/constants/http-response-message'
@Injectable()
export class UrlShortnerReadService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
    private readonly configService: ConfigService,
  ) {}

  // Returns the details of the short url and the stored originalUrl
  async getShortUrlDetails(hash: string): Promise<string> {
    const shortUrlDetails = await this.shortUrlModel.findOne({ hash }).then()

    if (!shortUrlDetails) {
      throw new BadRequestException(ShortnerErrorMessages.ERROR_NOT_FOUND)
    }

    return getSuccessResponse(shortUrlDetails, HttpResponseMessage.OK)
  }

  // Redirects the request to the originalUrl
  async redirectShortToOriginalUrl(hash: string, res): Promise<string> {
    const shortUrlDetails = await this.getShortUrlDetails(hash)
    if (!shortUrlDetails) {
      throw new BadRequestException(ShortnerErrorMessages.ERROR_NOT_FOUND)
    }

    // Redirect the request to other url
    const originalUrl = shortUrlDetails['data']['originalUrl']
    res.redirect(originalUrl)

    return getSuccessResponse(shortUrlDetails, HttpResponseMessage.OK)
  }
}
