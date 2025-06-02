import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private allowedWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]

  generateSrcset(originalUrl: string, quality = 30): string {
    const encodedUrl = encodeURIComponent(originalUrl)
    const base = `https://zoommer.ge/_next/image?url=${encodedUrl}`

    return this.allowedWidths
      .map((w) => `${base}&w=${w.toString()}&q=${quality.toString()} ${w.toString()}w`)
      .join(', ')
  }

  generateSrc(originalUrl: string, width = 1200, quality = 30): string {
    const encodedUrl = encodeURIComponent(originalUrl)
    return `https://zoommer.ge/_next/image?url=${encodedUrl}&w=${width.toString()}&q=${quality.toString()}`
  }
}
