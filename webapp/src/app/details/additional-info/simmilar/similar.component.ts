import { Component, Input } from '@angular/core'
import { ISimilarProductsList, ITranslations } from 'webapp/src/app/interfaces/product.interface'
import { TemplProductComponent } from '../../../templates/templ-product/templ-product.component'

@Component({
  selector: 'app-similar',
  imports: [TemplProductComponent],
  templateUrl: './similar.component.html',
  styleUrl: './similar.component.scss',
})
export class SimmilarComponent {
  @Input() similarProductsList?: ISimilarProductsList[]
  @Input() translations?: ITranslations
  @Input() currentLang: 'ka' | 'en' = 'en'
  public imageIndex = 0
  public offsetX = 0

  public nextImage(): void {
    if (this.similarProductsList && this.imageIndex != this.similarProductsList.length - 4) {
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
