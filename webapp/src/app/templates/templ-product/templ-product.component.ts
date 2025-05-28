import { Component, Input, OnInit } from '@angular/core'
import { IProduct } from '../../../interfaces/content.interface'
import { LocalStorageService } from '../../services/localstorage.service'
import { Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-templ-product',
  imports: [TranslateModule],
  templateUrl: './templ-product.component.html',
  styleUrl: './templ-product.component.scss',
})
export class TemplProductComponent implements OnInit {
  @Input() product?: IProduct
  @Input() route?: string[]
  @Input() imageUrl?: string
  @Input() productPrice?: number
  @Input() productSalePrice?: number
  @Input() productName?: string
  @Input() labelText?: string
  public showGrid?: string

  constructor(
    public translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorageService.observe('showGrid').subscribe((value) => {
      this.showGrid = value as string | undefined
    })
  }

  public navigate(route: string[] | undefined): void {
    if (!route) return
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  public roundPrice(price: number): number {
    return Math.floor(price)
  }
}
