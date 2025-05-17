import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

const megaMenuCache = new Map<string, { data: unknown; expiry: number }>()

@Injectable()
export class MegaMenuService {
  async megaMenu(lang: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage
    const cacheKey = selectedLang
    const cacheTTL = Number(process.env.CACHING_TIME) || 60
    const now = Date.now()

    const cached = megaMenuCache.get(cacheKey)
    if (cached && cached.expiry > now) {
      return cached.data
    }

    const httpsAgent = new https.Agent({ family: 4 })

    try {
      const response = await axios.get('https://api.zoommer.ge/v1/Content/mega-menu', {
        httpsAgent,
        headers: {
          'accept-language': selectedLang,
        },
        timeout: 5000,
      })

      megaMenuCache.set(cacheKey, {
        data: response.data,
        expiry: now + cacheTTL,
      })

      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new BadRequestException(`Zoommer API responded with status ${error.response.status.toString()}`)
        } else if (error.code === 'ECONNABORTED') {
          throw new BadRequestException('Request timed out')
        } else {
          throw new BadRequestException('Network error or no response received')
        }
      }
      throw new BadRequestException('Failed to fetch mega menu')
    }
  }
}
