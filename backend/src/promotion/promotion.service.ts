import { Injectable } from '@nestjs/common'
import { supportedLanguages, deafaultLanguage } from '../interfaces/constants'

@Injectable()
export class PromotionService {
  async promotion(lang: string, accessToken: string): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage
    const url = `https://zoommer.ge/_next/data/tcSRC4szT_IK-lFcLRMaH/${selectedLang}/promotions.json`

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'accept-language': selectedLang, authorization: accessToken },
    })
    if (!response.ok) {
      throw new Error(`Zoommer API error: ${response.status.toString()}`)
    }
    return await response.json()
  }
}
