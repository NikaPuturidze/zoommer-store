import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'
import { EImage, IContentResponse } from '../interfaces/content.interface'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public content?: IContentResponse
  public currentLang: 'en' | 'ka' = 'en'
  public carouselWidth = 0

  @ViewChild(ImageCarouselComponent, { read: ElementRef, static: true })
  private carouselHost!: ElementRef<HTMLElement>

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

  ngAfterViewInit(): void {
    this.updateCarouselWidth()
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateCarouselWidth()
  }

  private updateCarouselWidth(): void {
    this.carouselWidth = this.carouselHost.nativeElement.offsetWidth + EImage.GAP
  }

  private loadContent(): void {
    this.apiService.content(this.currentLang).subscribe({
      next: (data: IContentResponse) => {
        this.content = data
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load content', error)
      },
    })
  }
}
