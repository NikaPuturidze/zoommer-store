import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { EImage, IBanner, IContentResponse } from '../../interfaces/content.interface'

@Component({
  selector: 'app-image-carousel',
  imports: [],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent implements OnInit, OnChanges {
  @Input() public content?: IContentResponse
  public bannerWidths: number[] = []
  public translate = ''
  public offsetX = 0
  public imageIndex = 0

  ngOnInit(): void {
    setInterval(() => {
      this.nextImage()
    }, 5000)
  }

  ngOnChanges(): void {
    if (this.content?.section?.[0]?.banners) {
      this.bannerWidths = this.content.section[0].banners.map((banner) =>
        banner.largeBanner ? EImage.LARGE : EImage.SMALL
      )
    }
  }

  setImageDimension(image: IBanner): string {
    return image.largeBanner ? `${EImage.LARGE.toString()}px` : `${EImage.SMALL.toString()}px`
  }

  nextImage(): void {
    if (this.imageIndex == this.bannerWidths.length - 1) {
      this.offsetX = 0
      this.imageIndex = 0
    } else {
      this.offsetX -= this.bannerWidths[this.imageIndex] + EImage.GAP
      this.imageIndex++
    }
    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  previousImage(): void {
    if (this.imageIndex === 0) {
      this.imageIndex = this.bannerWidths.length - 1

      const arraySum = this.bannerWidths.reduce((accumulator, current) => accumulator + current, 0)
      const totalGap = EImage.GAP * (this.bannerWidths.length - 1)
      this.offsetX = arraySum + totalGap - this.bannerWidths[this.imageIndex]
    } else {
      this.imageIndex--
      this.offsetX -= this.bannerWidths[this.imageIndex] + EImage.GAP
    }

    this.translate = `translateX(-${this.offsetX.toString()}px)`
  }
}
