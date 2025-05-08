import { Component, OnInit } from '@angular/core'
import { EImage, IBanner, IContentResponse } from '../../interfaces/content.interface'
import { ApiService } from '../../services/api.service'
import { LanguageService } from '../../services/language.service'

@Component({
  selector: 'app-image-carousel',
  imports: [],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent implements OnInit {
  public content?: IContentResponse
  public bannerWidths: number[] = []
  public currentLang: 'en' | 'ka' = 'en'
  public translate = ''
  public offsetX = 0
  public imageIndex = 0

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadContent()
    })
  }
  public setImageDimension(image: IBanner): string {
    return image.largeBanner ? `${EImage.LARGE.toString()}px` : `${EImage.SMALL.toString()}px`
  }

  public nextImage(): void {
    if (this.imageIndex == this.bannerWidths.length - 1) {
      this.offsetX = 0
      this.imageIndex = 0
    } else {
      this.offsetX -= this.bannerWidths[this.imageIndex] + EImage.GAP
      this.imageIndex++
    }
    this.translate = `translateX(${this.offsetX.toString()}px)`
  }

  public previousImage(): void {
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

  private loadContent(): void {
    this.apiService.content(this.currentLang).subscribe({
      next: (data: IContentResponse) => {
        this.content = data
        if (this.content?.section?.[0]?.banners) {
          this.bannerWidths = this.content.section[0].banners.map((banner) =>
            banner.largeBanner ? EImage.LARGE : EImage.SMALL
          )
        }
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load content', error)
      },
    })
  }
}
