import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class CartService {
  async cart(lang: string, accessToken: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path: '/v1/Cart',
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
        console.error('Error fetching mega menu:', error)
        reject(new ConflictException('Failed to fetch cart'))
      })

      request.end()
    })
  }

  async cartPost(lang: string, accessToken: string, productId: string, quantity: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const path = `/v1/Cart`

    const requestBody = JSON.stringify({
      productId,
      quantity,
    })

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path,
      method: 'POST',
      headers: {
        Host: hostname,
        'Accept-Language': selectedLang,
        Authorization: accessToken,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
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
        console.error('Error fetching topic:', error)
        reject(new BadRequestException('Failed to fetch User'))
      })

      request.write(requestBody)
      request.end()
    })
  }
}
