import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { EContent, IContentResponse } from '../../../interfaces/content.interface'
import { CommonModule } from '@angular/common'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { Router } from '@angular/router'
import { ViewportService } from '../../services/viewport.service'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { SrcsetDirective } from '../../services/directives/srcset.directive'

@Component({
  selector: 'app-sections',
  imports: [CommonModule, TemplProductComponent, ContentLoaderModule, SrcsetDirective],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent implements OnChanges, OnInit {
  @Input() content?: IContentResponse
  public sectionArray: number[] = []
  public viewportWidth = 0

  constructor(
    private router: Router,
    private viewport: ViewportService
  ) {}

  ngOnChanges(): void {
    this.sectionArray = new Array(this.content?.section.length).fill(0) as number[]
  }

  ngOnInit(): void {
    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
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
