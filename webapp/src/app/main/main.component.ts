import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'
import { EContent, IContentResponse } from '../interfaces/content.interface'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { SectionsComponent } from './sections/sections.component'
import { LocalStorageService } from '../services/localstorage.service'
import { ContentLoaderModule } from '@ngneat/content-loader'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent, SectionsComponent, ContentLoaderModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public content?: IContentResponse
  public carouselWidth = 0
  public currentLang: 'en' | 'ka' = 'en'

  @ViewChild(ImageCarouselComponent, { read: ElementRef, static: true })
  private carouselHost!: ElementRef<HTMLElement>

  ngAfterViewInit(): void {
    this.updateCarouselWidth()
  }

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLang = language
      this.loadContent()
    })

    this.localStorageService.set('showGrid', 'true')
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateCarouselWidth()
  }

  private updateCarouselWidth(): void {
    setTimeout(() => {
      this.carouselWidth = this.carouselHost.nativeElement.offsetWidth + EContent.GAP
    })
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
