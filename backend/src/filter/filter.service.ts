import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

const filterCache = new Map<string, { data: unknown; expiry: number }>()

@Injectable()
export class FilterService {
  async filter(lang: string, catId: number): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage
    const cacheKey = `${selectedLang}:${catId.toString()}`
    const now = Date.now()
    const cacheTTL = Number(process.env.CACHING_TIME) || 60

    const cached = filterCache.get(cacheKey)
    if (cached && cached.expiry > now) {
      return cached.data
    }

    const httpsAgent = new https.Agent({ family: 4, keepAlive: true })

    try {
      const response = await axios.get('https://api.zoommer.ge/v1/Content/filter', {
        httpsAgent,
        headers: {
          'accept-language': selectedLang,
        },
        params: { catId },
        timeout: 5000,
      })

      filterCache.set(cacheKey, {
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
      throw new BadRequestException('Failed to fetch filter')
    }
  }
}
