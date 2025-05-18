import { Component, Input } from '@angular/core'
import { IAccessory } from 'webapp/src/app/interfaces/product.interface'
import { TemplProductComponent } from '../../../templates/templ-product/templ-product.component'

@Component({
  selector: 'app-accesories',
  imports: [TemplProductComponent],
  templateUrl: './accesories.component.html',
  styleUrl: './accesories.component.scss',
})
export class AccesoriesComponent {
  @Input() accesories?: IAccessory[]
  @Input() currentLang: 'ka' | 'en' = 'en'
  public imageIndex = 0
  public offsetX = 0

  public nextImage(): void {
    if (this.accesories && this.imageIndex != this.accesories?.length - 4) {
      this.imageIndex++
      this.offsetX -= 180
    }
  }

  public previousImage(): void {
    if (this.imageIndex != 0) {
      this.imageIndex--
      this.offsetX += 180
    }
  }
}
