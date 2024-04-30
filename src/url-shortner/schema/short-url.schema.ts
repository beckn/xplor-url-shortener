import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
@Schema({ timestamps: true })
export class ShortUrl extends Document {
  @Prop({ default: () => `url_${uuidv4()}` })
  _id: string

  @Prop({ required: true })
  shortUrl: string

  @Prop({ required: true })
  originalUrl: string

  @Prop({ required: true })
  hash: string
}
export const ShortUrlModel = ShortUrl.name
export type ShortUrlDocument = ShortUrl & Document
export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl)
