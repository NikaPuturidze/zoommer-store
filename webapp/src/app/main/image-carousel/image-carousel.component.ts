import { Component, Input, OnChanges } from '@angular/core'
import { EContent, IBanner, IContentResponse } from '../../interfaces/content.interface'

@Component({
  selector: 'app-image-carousel',
  imports: [],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent implements OnChanges {
  @Input() public content?: IContentResponse
  public bannerWidths: number[] = []
  public width = 0
  public translate = ''
  public offsetX = 0
  public imageIndex = 0

  ngOnChanges(): void {
    if (this.content?.section?.[0]?.banners) {
      this.bannerWidths = this.content.section[0].banners.map((banner) =>
        banner.largeBanner ? EContent.LARGE : EContent.SMALL
      )

      if (this.width !== 0) {
        this.width = this.bannerWidths.reduce((accumulator: number, width: number) => accumulator + width, 0)
      }
    }
  }

  public setImageDimension(image: IBanner): string {
    return image.largeBanner ? `${EContent.LARGE.toString()}px` : `${EContent.SMALL.toString()}px`
  }

  public nextImage(): void {
    if (this.imageIndex == this.bannerWidths.length - 1) {
      this.offsetX = 0
      this.imageIndex = 0
    } else {
      this.offsetX -= this.bannerWidths[this.imageIndex] + EContent.GAP
      this.imageIndex++
    }
    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  public previousImage(): void {
    if (this.imageIndex === 0) {
      this.imageIndex = this.bannerWidths.length - 1

      const arraySum = this.bannerWidths.reduce((accumulator, current) => accumulator + current, 0)
      const totalGap = EContent.GAP * (this.bannerWidths.length - 1)
      this.offsetX = arraySum + totalGap - this.bannerWidths[this.imageIndex]
    } else {
      this.imageIndex--
      this.offsetX -= this.bannerWidths[this.imageIndex] + EContent.GAP
    }

    this.translate = `translateX(-${this.offsetX.toString()}px)`
  }
}
