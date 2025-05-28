import { Component, Input } from '@angular/core'
import { ITopicsResponse } from '../../interfaces/topics.interface'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() topics?: ITopicsResponse

  constructor(private router: Router) {}

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
