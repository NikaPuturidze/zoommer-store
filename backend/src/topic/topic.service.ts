import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'

@Injectable()
export class TopicService {
  async topic(lang: string, title: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    try {
      const response = await axios.get('https://api.zoommer.ge/v1/Topics/get-topic', {
        headers: {
          'accept-language': selectedLang,
        },
        params: {
          title,
        },
        timeout: 5000,
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

      console.error('Error fetching topic:', error)
      throw new BadRequestException('Failed to fetch topic')
    }
  }
}
