import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import { parse as parseCookie } from 'cookie'

@Injectable()
export class CookieService {
  private readonly TargetUrl = 'https://zoommer.ge/'

  async getAuthToken(): Promise<string> {
    let response: AxiosResponse<unknown>
    try {
      response = await axios.get<unknown>(this.TargetUrl, {
        validateStatus: () => true,
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw new ConflictException(`Network error fetching Zoommer homepage: ${message}`)
    }

    const maybeSetCookie = response.headers['set-cookie']
    if (!Array.isArray(maybeSetCookie) || maybeSetCookie.length === 0) {
      throw new BadRequestException('No Set-Cookie headers received')
    }

    let token: string | undefined
    for (const header of maybeSetCookie) {
      const cookies = parseCookie(header)
      if (typeof cookies['zoommer-access_token'] === 'string') {
        token = cookies['zoommer-access_token']
        break
      }
    }

    if (!token) {
      throw new BadRequestException('access_token not found in cookies')
    }

    return token
  }
}
