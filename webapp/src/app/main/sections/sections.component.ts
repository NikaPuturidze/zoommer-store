import { Component, Input, OnChanges } from '@angular/core'
import { EContent, IContentResponse } from '../../interfaces/content.interface'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sections',
  imports: [CommonModule],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent implements OnChanges {
  @Input() content?: IContentResponse
  @Input() currentLang: 'en' | 'ka' = 'en'
  public sectionArray: number[] = []

  ngOnChanges(): void {
    this.sectionArray = new Array(this.content?.section.length).fill(0) as number[]
  }

  public getOffset(index: number): number {
    return this.sectionArray[index]
  }

  public nextImage(index: number): void {
    if (this.content?.section[index].products) {
      const sliderOneTotalWidth: number = this.content.section[index].products?.length * EContent.SLIDER_ONE_OFFSET

      if (sliderOneTotalWidth - this.sectionArray[index] > (EContent.SLIDER_WIDTH as number)) {
        this.sectionArray[index] += EContent.SLIDER_ONE_OFFSET
      } else {
        this.sectionArray[index] = 0
      }
    } else if (this.content?.section[index].banners) {
      const sliderTwoTotalWidth: number = this.content.section[index].banners?.length * EContent.SLIDER_TWO_OFFSET

      if (sliderTwoTotalWidth - this.sectionArray[index] > (EContent.SLIDER_WIDTH as number)) {
        this.sectionArray[index] += EContent.SLIDER_TWO_OFFSET
      } else {
        this.sectionArray[index] = 0
      }
    }
  }

  public previousImage(index: number): void {
    if (this.content?.section[index].products) {
      const sliderTotalWidth: number = this.content.section[index].products?.length * EContent.SLIDER_ONE_OFFSET

      if (this.sectionArray[index] === 0) {
        this.sectionArray[index] = sliderTotalWidth - EContent.SLIDER_WIDTH
      } else {
        this.sectionArray[index] -= EContent.SLIDER_ONE_OFFSET
      }
    } else if (this.content?.section[index].banners) {
      const sliderTwoTotalWidth: number = this.content.section[index].banners.length * EContent.SLIDER_TWO_OFFSET

      if (this.sectionArray[index] === 0) {
        this.sectionArray[index] = sliderTwoTotalWidth - EContent.SLIDER_WIDTH
      } else {
        this.sectionArray[index] -= EContent.SLIDER_TWO_OFFSET
      }
    }
  }

  public roundPrice(price: number): number {
    return Math.floor(price)
  }
}
