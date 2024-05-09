import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ShortUrl } from '../schema/short-url.schema'
import { ShortnerErrorMessages } from '../../common/constants/error-messages'
import { getSuccessResponse } from '../../common/constants/get-success-response'
import { HttpResponseMessage } from '../../common/constants/http-response-message'
import { SERVICE_BASE_URL } from '../../common/constants/name-constants'
import { API_PREFIX, SHORTNER_URL } from '../../common/constants/api-constant'
import { generateUniqueHash } from '../../utils/hash.util'
@Injectable()
export class UrlShortnerCreateService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
    private readonly configService: ConfigService,
  ) {}

  // Creates a short URL for the original URL with a unique hash
  async createShortUrl(originalUrl: string): Promise<string> {
    const hash = generateUniqueHash(originalUrl)

    const shortUrl = `${this.configService.get(SERVICE_BASE_URL)}/${API_PREFIX}/${SHORTNER_URL}/${hash}`

    const newShortUrl = await this.shortUrlModel.create({ originalUrl, hash, shortUrl })

    if (!newShortUrl) {
      throw new BadRequestException(ShortnerErrorMessages.ERROR_CREATING_URL)
    }

    return getSuccessResponse(newShortUrl, HttpResponseMessage.OK)
  }
}
