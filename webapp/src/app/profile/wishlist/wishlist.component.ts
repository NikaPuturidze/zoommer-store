import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { IWishList } from 'webapp/src/interfaces/wishlist.interface'
import { TranslateModule } from '@ngx-translate/core'
import { TemplProductComponent } from '../../templates/templ-product/templ-product.component'
import { IClearAllWishlist } from 'webapp/src/interfaces/clear-all-wishlist.interface'

@Component({
  selector: 'app-wishlist',
  imports: [TranslateModule, TemplProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  public wishlist?: IWishList

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.wishlist().subscribe({
      next: (data: IWishList) => {
        this.wishlist = data
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public clearAll(): void {
    if (this.wishlist?.productItems && this.wishlist?.productItems.length > 0)
      this.apiService.clearAllWishList().subscribe({
        next: (data: IClearAllWishlist) => {
          if (data.success) this.wishlist = undefined
        },
        error: (error: unknown) => {
          console.error(error)
        },
      })
  }
}
