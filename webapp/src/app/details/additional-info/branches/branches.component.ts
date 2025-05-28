import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IAvailabilityInStores } from 'webapp/src/interfaces/product.interface'

@Component({
  selector: 'app-branches',
  imports: [TranslateModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.scss',
})
export class BranchesComponent implements OnChanges {
  @Input() availabilityInStores?: IAvailabilityInStores[]
  public inStockBranches?: IAvailabilityInStores[]
  public showMore = false
  public availabilityType = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availabilityInStores'].currentValue) {
      this.inStockBranches = this.availabilityInStores?.filter((branch) => branch.inStock)
    }
  }
}
