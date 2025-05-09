import { Component } from '@angular/core'
import { NavigationComponent } from './navigation/navigation.component'
import { HeaderComponent } from './header/header.component'
import { MainComponent } from './main/main.component'
import { FooterComponent } from './footer/footer.component'

@Component({
  selector: 'app-root',
  imports: [NavigationComponent, HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
