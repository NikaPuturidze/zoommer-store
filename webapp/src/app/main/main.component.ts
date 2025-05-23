import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { CategoryComponent } from './category/category.component'
import { ImageCarouselComponent } from './image-carousel/image-carousel.component'
import { EContent, IContentResponse } from '../interfaces/content.interface'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { SectionsComponent } from './sections/sections.component'
import { LocalStorageService } from '../services/localstorage.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { ViewportService } from '../services/viewport.service'
import { IMegaMenu } from '../interfaces/mega-menu.interface'
import { BurgerService } from '../services/burger.service'

@Component({
  selector: 'app-main',
  imports: [CategoryComponent, ImageCarouselComponent, SectionsComponent, ContentLoaderModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, AfterViewInit {
  @Input() public megaMenu?: (IMegaMenu | undefined)[]
  public content?: IContentResponse
  public carouselWidth = 0
  public currentLang: 'en' | 'ka' = 'en'
  public viewportWidth

  @ViewChild(ImageCarouselComponent, { read: ElementRef, static: true })
  private carouselHost!: ElementRef<HTMLElement>

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    private viewport: ViewportService,
    private burgerService: BurgerService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      this.megaMenu = undefined
      this.content = undefined
      this.currentLang = language
      this.loadContent()
      this.loadMegaMenu()
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })

    this.localStorageService.set('showGrid', 'true')
  }

  ngAfterViewInit(): void {
    this.updateCarouselWidth()
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateCarouselWidth()
  }

  private loadMegaMenu(): void {
    this.apiService.megaMenu(this.currentLang).subscribe({
      next: (data: IMegaMenu[]) => {
        this.megaMenu = data
        this.burgerService.setMegaMenu(data)
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load mega-menu', error)
      },
    })
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
