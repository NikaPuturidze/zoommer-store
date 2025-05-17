import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class ProductsService {
  async products(
    lang: string,
    page: number,
    limit: number,
    specificationIds: string,
    categoryId?: number,
    categories?: number,
    priceFrom?: number,
    priceTo?: number,
    priceAsc?: boolean,
    nameAsc?: boolean
  ): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const parameters: Record<string, string | number | boolean> = {
      page,
      limit,
    }

    if (categoryId !== undefined) parameters['categoryId'] = categoryId
    if (categories !== undefined) parameters['categories'] = categories
    if (specificationIds) parameters['specificationIds'] = specificationIds
    if (priceFrom !== undefined) parameters['MinPrice'] = priceFrom
    if (priceTo !== undefined) parameters['MaxPrice'] = priceTo
    if (priceAsc !== undefined) parameters['PriceAsc'] = priceAsc
    if (nameAsc !== undefined) parameters['NameAsc'] = nameAsc

    const httpsAgent = new https.Agent({ family: 4, keepAlive: true })

    try {
      const response = await axios.get('https://api.zoommer.ge/v1/Products/v3', {
        httpsAgent,
        headers: {
          'accept-language': selectedLang,
        },
        params: parameters,
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
      throw new BadRequestException('Failed to fetch products')
    }
  }
}
