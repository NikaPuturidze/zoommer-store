import { Component, ElementRef, Input, OnInit } from '@angular/core'
import { IProduct } from '../../../interfaces/product.interface'
import { Router } from '@angular/router'
import { ViewportService } from '../../services/viewport.service'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-overview',
  imports: [TranslateModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  @Input() product?: IProduct
  public viewportWidth = 0
  private prevWidth: number | null = null

  constructor(
    private router: Router,
    private viewport: ViewportService,
    private hostReference: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.viewport.Viewport$.subscribe(({ width }) => {
      this.viewportWidth = width

      if (this.prevWidth !== null) {
        const crossedToSmall = this.prevWidth > 1024 && width <= 1024
        const crossedToLarge = this.prevWidth <= 1024 && width > 1024

        if ((crossedToSmall || crossedToLarge) && this.product?.translateX) {
          this.product.translateX = 0
          this.product.currentImage = 0

          this.hostReference.nativeElement.scrollLeft = 0
        }
      }

      this.prevWidth = width
      this.viewportWidth = width
    })
  }

  public nextImg(): void {
    if (this.product && this.product.currentImage < this.product.images.length - 1) {
      this.product.currentImage++
      this.product.translateX -= 100
    }
  }

  public previousImg(): void {
    if (this.product && this.product.currentImage > 0) {
      this.product.currentImage--
      this.product.translateX += 100
    }
  }

  public moveToSpecific(to: number): void {
    if (this.product) {
      let step = to - this.product.currentImage

      if (step > 0) {
        while (step--) this.nextImg()
      } else {
        while (step++) this.previousImg()
      }
    }
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
