import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class FilterService {
  async filter(lang: string, catId: number, accessToken: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const query = new URLSearchParams({ catId: catId.toString() }).toString()
    const path = `/v1/Content/filter?${query}`

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
        console.error('Error fetching filter:', error)
        reject(new ConflictException('Failed to fetch filter'))
      })

      request.end()
    })
  }
}
