import { Component, Input } from '@angular/core'
import { IProduct } from '../../interfaces/product.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  @Input() public product?: IProduct
  @Input() currentLang?: 'en' | 'ka'

  constructor(private router: Router) {}

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
