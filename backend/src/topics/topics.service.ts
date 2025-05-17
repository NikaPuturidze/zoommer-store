import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

const topicsCache = new Map<string, { data: unknown; expiry: number }>()

@Injectable()
export class TopicsService {
  async topics(lang: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage
    const cacheKey = selectedLang

    const now = Date.now()

    const cached = topicsCache.get(cacheKey)
    if (cached && cached.expiry > now) {
      return cached.data
    }

    const httpsAgent = new https.Agent({ family: 4, keepAlive: true })

    try {
      const response = await axios.get('https://api.zoommer.ge/v1/Topics/get-topics', {
        httpsAgent,
        headers: {
          'accept-language': selectedLang,
        },
        timeout: 5000,
      })

      topicsCache.set(cacheKey, {
        data: response.data,
        expiry: now + 60_000,
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
      throw new BadRequestException('Failed to fetch topics')
    }
  }
}
