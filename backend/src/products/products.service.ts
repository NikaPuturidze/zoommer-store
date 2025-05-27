import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class ProductsService {
  async products(
    lang: string,
    accessToken: string,
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
    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(categoryId ? { categoryId: categoryId.toString() } : {}),
      ...(categories ? { categories: categories.toString() } : {}),
      ...(specificationIds ? { specificationIds: specificationIds.toString() } : {}),
      ...(priceFrom ? { MinPrice: priceFrom.toString() } : {}),
      ...(priceTo ? { MaxPrice: priceTo.toString() } : {}),
      ...(priceAsc ? { PriceAsc: (!priceAsc).toString() } : {}),
      ...(nameAsc ? { NameAsc: nameAsc.toString() } : {}),
    }).toString()

    const path = `/v1/Products/v3?${query}`

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path,
      method: 'GET',
      headers: {
        Host: hostname,
        'accept-language': selectedLang,
        authorization: accessToken,
      },
      servername: hostname,
    }

    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        const data: Buffer[] = []

        response.on('data', (chunk: Buffer) => {
          data.push(chunk)
        })

        response.on('end', () => {
          try {
            const json = Buffer.concat(data).toString('utf8')
            const parsed: unknown = JSON.parse(json)
            resolve(parsed)
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            reject(new BadRequestException('Failed to parse response from Zoommer API: ' + message))
          }
        })
      })

      request.on('error', (error) => {
        console.error('Error fetching products:', error)
        reject(new ConflictException('Failed to fetch products'))
      })

      request.end()
    })
  }
}
