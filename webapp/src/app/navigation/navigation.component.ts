import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ITopicsResponse } from '../../interfaces/topics.interface'
import { Router } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, TranslateModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() topics?: ITopicsResponse
  public isLanguageMenuOpen = false

  constructor(
    private router: Router,
    public translateService: TranslateService
  ) {}

  public toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen
  }

  public chooseLanguage(event: MouseEvent): void {
    event.stopPropagation()
    window.localStorage.setItem('language', this.translateService.currentLang === 'en' ? 'ka' : 'en')
    this.translateService.use(this.translateService.currentLang === 'en' ? 'ka' : 'en')
    this.isLanguageMenuOpen = false
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
