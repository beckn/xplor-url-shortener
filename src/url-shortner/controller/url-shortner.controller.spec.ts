import { Test, TestingModule } from '@nestjs/testing'
import { UrlShortnerController } from './url-shortner.controller'
import { UrlShortnerCreateService } from '../service/url-shortner-create.service'
import { UrlShortnerDeleteService } from '../service/url-shortner-delete.service'
import { UrlShortnerReadService } from '../service/url-shortner-read.service'

describe('UrlShortnerController', () => {
  let controller: UrlShortnerController
  let createService: UrlShortnerCreateService
  let deleteService: UrlShortnerDeleteService
  let readService: UrlShortnerReadService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortnerController],
      providers: [
        {
          provide: UrlShortnerCreateService,
          useValue: {
            createShortUrl: jest.fn(),
          },
        },
        {
          provide: UrlShortnerDeleteService,
          useValue: {
            deleteShortUrl: jest.fn(),
          },
        },
        {
          provide: UrlShortnerReadService,
          useValue: {
            redirectShortToOriginalUrl: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<UrlShortnerController>(UrlShortnerController)
    createService = module.get<UrlShortnerCreateService>(UrlShortnerCreateService)
    deleteService = module.get<UrlShortnerDeleteService>(UrlShortnerDeleteService)
    readService = module.get<UrlShortnerReadService>(UrlShortnerReadService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createShortUrl', () => {
    it('should call createShortUrl method of service with valid DTO', async () => {
      const originalUrl = 'https://example.com'
      const dto = { originalUrl }
      const spy = jest.spyOn(createService, 'createShortUrl').mockResolvedValueOnce('http://url.com/abc123')
      await controller.createShortUrl(dto)
      expect(spy).toHaveBeenCalledWith(originalUrl)
    })
  })

  describe('deleteShortUrl', () => {
    it('should call deleteShortUrl method of service with valid shortUrl', async () => {
      const shortUrl = 'abc123'
      const spy = jest.spyOn(deleteService, 'deleteShortUrl').mockResolvedValueOnce('http://url.com/abc123')
      await controller.deleteShortUrl(shortUrl)
      expect(spy).toHaveBeenCalledWith(shortUrl)
    })
  })

  describe('redirectShortToOriginalUrl', () => {
    it('should call redirectShortToOriginalUrl method of service with valid hash', async () => {
      const shortUrl = 'http://url.com/abc123'
      const res = { redirect: 'http://original-url.com/abc123' } as any
      jest.spyOn(readService, 'redirectShortToOriginalUrl').mockResolvedValueOnce('http://url.com/abc123')
      const result = await controller.redirectShortToOriginalUrl('abc123', null, res)
      expect(result).toEqual(shortUrl)
    })
  })
})
