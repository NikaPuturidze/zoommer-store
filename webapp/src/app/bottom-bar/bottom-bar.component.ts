import { Component } from '@angular/core'
import { MatRippleModule } from '@angular/material/core'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BurgerService } from '../services/burger.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-bottom-bar',
  imports: [TranslateModule, MatRippleModule],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss',
})
export class BottomBarComponent {
  constructor(
    private router: Router,
    private burgerService: BurgerService,
    public authService: AuthService
  ) {}

  public isCurrentRoute(route: string): boolean {
    return this.router.url === route
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }

  public toggleBurger(): void {
    this.burgerService.setBurger(this.burgerService.burgerTranslate.value === 0 ? -100 : 0)
  }
}
