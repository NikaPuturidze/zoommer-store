import { BadRequestException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'

@Injectable()
export class ProductsService {
  async products(
    lang: string,
    page: number,
    limit: number,
    categoryId?: number,
    categories?: number
  ): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const parameters = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(categoryId ? { categoryId: categoryId.toString() } : {}),
      ...(categories ? { categories: categories.toString() } : {}),
    })

    try {
      const response = await fetch(`https://api.zoommer.ge/v1/Products/v3?${parameters.toString()}`, {
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
      console.error('Error fetching products:', error)
      throw new BadRequestException('Failed to fetch products')
    }
  }
}
