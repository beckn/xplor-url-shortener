import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ShortUrl } from '../schema/short-url.schema'
import { ShortnerErrorMessages } from '../../common/constants/error-messages'
import { getSuccessResponse } from '../../common/constants/get-success-response'
import { HttpResponseMessage } from '../../common/constants/http-response-message'
@Injectable()
export class UrlShortnerDeleteService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
    private readonly configService: ConfigService,
  ) {}

  // Deletes a short URL using the shortUrl of the Url
  async deleteShortUrl(shortUrl: string): Promise<string> {
    const deletedShortUrl = await this.shortUrlModel.findOneAndDelete({ shortUrl }).then()

    if (!deletedShortUrl) {
      throw new BadRequestException(ShortnerErrorMessages.ERROR_DELETING_URL)
    }

    return getSuccessResponse(deletedShortUrl, HttpResponseMessage.OK)
  }
}
