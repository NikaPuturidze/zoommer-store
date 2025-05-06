import { BadRequestException, Injectable } from '@nestjs/common'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'

@Injectable()
export class MegaMenuService {
  async megaMenu(lang: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    try {
      const response = await fetch('https://api.zoommer.ge/v1/Content/mega-menu', {
        method: 'GET',
        headers: {
          'accept-language': selectedLang,
        },
      })

      if (!response.ok) {
        throw new Error(`Zoommer API responded with status ${response.status.toString()}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching topics:', error)
      throw new BadRequestException('Failed to fetch topics')
    }
  }
}
