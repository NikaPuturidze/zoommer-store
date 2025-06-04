import { Component } from '@angular/core'
import { MatRippleModule } from '@angular/material/core'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-orders',
  imports: [TranslateModule, RouterModule, MatRippleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  public activeTab = 'current'
}
