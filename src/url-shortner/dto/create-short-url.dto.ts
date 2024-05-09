import { IsString, IsNotEmpty } from 'class-validator'

export class CreateShortUrlDto {
  @IsNotEmpty({ message: 'Original URL is required' })
  @IsString({ message: 'Original URL must be a string' })
  originalUrl: string
}
