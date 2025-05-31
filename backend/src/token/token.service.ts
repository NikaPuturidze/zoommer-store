import { BadRequestException, Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class TokenService {
  async token(lang: string, accessToken: string, username: string, password: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET

    if (!clientId) throw new Error('Please specify CLIENT_ID in .env')
    if (!clientSecret) throw new Error('Please specify CLIENT_SECRET in .env')

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const path = `/connect/token`

    const requestBody = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
      scope: 'ZoomerApi',
    }).toString()

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path,
      method: 'POST',
      headers: {
        Host: hostname,
        'Accept-Language': selectedLang,
        authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
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
        reject(new BadRequestException('Failed to fetch token'))
      })

      request.write(requestBody)
      request.end()
    })
  }
}
