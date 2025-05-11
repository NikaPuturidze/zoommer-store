import { BadRequestException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'

@Injectable()
export class FilterService {
  async filter(lang: string, catId: number): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const parameters = new URLSearchParams({
      catId: catId.toString(),
    })

    try {
      const response = await fetch(`https://api.zoommer.ge/v1/Content/filter?${parameters.toString()}`, {
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
      console.error('Error fetching filter:', error)
      throw new BadRequestException('Failed to fetch filter')
    }
  }
}
