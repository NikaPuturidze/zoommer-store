import { Component, OnInit } from '@angular/core'
import { NavigationComponent } from './navigation/navigation.component'

@Component({
  selector: 'app-root',
  imports: [NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (!window.localStorage.getItem('lang')) {
      window.localStorage.setItem('lang', 'en')
    }
  }
}
