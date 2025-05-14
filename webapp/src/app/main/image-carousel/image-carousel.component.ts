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
  public translate = ''
  public offsetX = 0
  public imageIndex = 0

  ngOnChanges(): void {
    if (this.content?.section?.[0]?.banners) {
      this.bannerWidths = this.content.section[0].banners.map((banner) =>
        banner.largeBanner ? EContent.LARGE : EContent.SMALL
      )
    }
  }

  public setImageDimension(image: IBanner): string {
    return image.largeBanner ? `${EContent.LARGE.toString()}px` : `${EContent.SMALL.toString()}px`
  }

  public nextImage(): void {
    if (this.imageIndex === this.bannerWidths.length - 4) {
      this.offsetX = -76 - EContent.GAP
      this.imageIndex = this.bannerWidths.length - 1
    } else if (this.imageIndex !== this.bannerWidths.length - 1) {
      this.offsetX -= this.bannerWidths[this.imageIndex] + EContent.GAP
      this.imageIndex++
    }
    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  public previousImage(): void {
    if (this.imageIndex == this.bannerWidths.length - 1) {
      this.offsetX += 76 + EContent.GAP
      this.imageIndex = 0
    } else if (this.imageIndex !== 0) {
      this.imageIndex--
      this.offsetX -= this.bannerWidths[this.imageIndex] + EContent.GAP
    }

    this.translate = `translateX(-${this.offsetX.toString()}px)`
  }
}
