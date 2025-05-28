import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class DetailsService {
  async details(lang: string, productId: number, accessToken: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const query = new URLSearchParams({ productId: productId.toString() }).toString()
    const path = `/v1/Products/details?${query}`

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

        response.on('data', (chunk: Buffer) => data.push(chunk))
        response.on('end', () => {
          try {
            const json = Buffer.concat(data).toString('utf8')
            const parsed: object = JSON.parse(json) as object

            resolve(parsed)
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            reject(new BadRequestException('Failed to parse response from Zoommer API: ' + message))
          }
        })
      })

      request.on('error', (error) => {
        console.error('Error fetching details:', error)
        reject(new ConflictException('Failed to fetch details'))
      })

      request.end()
    })
  }
}
