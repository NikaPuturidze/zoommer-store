import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class ContentService {
  async megaMenu(lang: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path: '/v1/Content/get-content-v2',
      method: 'GET',
      headers: {
        Host: hostname,
        'accept-language': selectedLang,
      },
      servername: hostname,
    }

    return new Promise((resolve, reject) => {
      const reqeust = https.request(options, (response) => {
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

      reqeust.on('error', (error) => {
        console.error('Error fetching topics:', error)
        reject(new ConflictException('Unexcpected Error in backend'))
      })

      reqeust.end()
    })
  }
}
