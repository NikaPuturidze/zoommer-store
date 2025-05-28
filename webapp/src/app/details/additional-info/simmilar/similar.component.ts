import { Component, Input } from '@angular/core'
import { ISimilarProductsList } from 'webapp/src/interfaces/product.interface'
import { TemplProductComponent } from '../../../templates/templ-product/templ-product.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-similar',
  imports: [TemplProductComponent, TranslateModule],
  templateUrl: './similar.component.html',
  styleUrl: './similar.component.scss',
})
export class SimmilarComponent {
  @Input() similarProductsList?: ISimilarProductsList[]
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
