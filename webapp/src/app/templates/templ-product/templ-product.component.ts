import { Component, Input, OnInit } from '@angular/core'
import { IProduct } from '../../interfaces/content.interface'
import { LocalStorageService } from '../../services/localstorage.service'

@Component({
  selector: 'app-templ-product',
  imports: [],
  templateUrl: './templ-product.component.html',
  styleUrl: './templ-product.component.scss',
})
export class TemplProductComponent implements OnInit {
  @Input() product?: IProduct
  @Input() currentLang: 'en' | 'ka' = 'en'
  public showGrid?: string

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }

  public roundPrice(price: number): number {
    return Math.floor(price)
  }
}
