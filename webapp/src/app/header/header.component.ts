import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public currentLang = 'en'
  public navigation = ''
  public cart = ''
  public search = ''
  public logIn = ''

  ngOnInit(): void {
    const savedLang = window.localStorage.getItem('lang')
    this.currentLang = savedLang === 'ka' ? 'ka' : 'en'

    this.updateLanguageState()
  }

  updateLanguageState(): void {
    this.navigation = this.currentLang === 'en' ? 'Navigation' : 'ნავიგაცია'
    this.search = this.currentLang === 'en' ? 'Search' : 'ძიება'
    this.cart = this.currentLang === 'en' ? 'Cart' : 'კალათა'
    this.logIn = this.currentLang === 'en' ? 'Log In' : 'შესვლა'
  }
}
