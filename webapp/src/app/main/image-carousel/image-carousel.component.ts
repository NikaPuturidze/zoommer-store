import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { EContent, IBanner, IContentResponse } from '../../interfaces/content.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { Router } from '@angular/router'

@Component({
  selector: 'app-image-carousel',
  imports: [ContentLoaderModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent implements OnChanges {
  @Input() public content?: IContentResponse
  public bannerWidths: number[] = []
  public translate = ''
  public offsetX = 0
  public imageIndex = 0

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'].currentValue && this.content?.section?.[0]?.banners) {
      this.bannerWidths = this.content.section[0].banners.map((banner) =>
        banner.largeBanner ? EContent.LARGE : EContent.SMALL
      )
    }
  }

  public setImageDimension(image: IBanner): string {
    return image.largeBanner ? `${EContent.LARGE.toString()}px` : `${EContent.SMALL.toString()}px`
  }

  public nextImage(): void {
    if (this.imageIndex === this.bannerWidths.length - 4 && this.bannerWidths[this.imageIndex + 3] !== 895) {
      this.offsetX = -76 - EContent.GAP
      this.imageIndex = this.bannerWidths.length - 1
    } else if (this.imageIndex !== this.bannerWidths.length - 1) {
      this.offsetX -= this.bannerWidths[this.imageIndex + 1] + EContent.GAP
      this.imageIndex++
    }
    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  public previousImage(): void {
    if (this.imageIndex > 0) {
      this.offsetX += this.bannerWidths[this.imageIndex] + EContent.GAP
      this.imageIndex--
    }

    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  public formatUrl(url: string): { path: string; queryParams: Record<string, string> } {
    const withoutDomain = url.replace(/^https?:\/\/zoommer\.ge\//, '')
    const [basePath] = withoutDomain.split('?')

    const decodedPath = decodeURIComponent(basePath)
    if (!decodedPath.includes(';')) {
      return {
        path: '/' + decodedPath,
        queryParams: {},
      }
    }

    const segments = decodedPath.split('/')
    const lastSegment = segments[segments.length - 1] || ''
    const parentPath = segments.slice(0, -1).join('/')

    const tokens = lastSegment.split(';').filter((token) => token.length > 0)

    let categoryId = ''
    const queryParameters: Record<string, string> = {}

    for (const token of tokens) {
      if (token.startsWith('-c')) {
        categoryId = token.substring(2)
      } else if (token.includes('=')) {
        const [key, value] = token.split('=')
        queryParameters[key] = value
      }
    }

    const path = `/${parentPath}${categoryId ? '-c' + categoryId : ''}`

    return { path, queryParams: queryParameters }
  }

  public navigate(route: string): void {
    const { path, queryParams } = this.formatUrl(route)
    this.router.navigate([path], { queryParams }).catch((error: unknown) => {
      console.error(error)
    })
  }
}
