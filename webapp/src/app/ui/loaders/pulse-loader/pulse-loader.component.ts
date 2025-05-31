import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-pulse-loader',
  imports: [],
  templateUrl: './pulse-loader.component.html',
  styleUrl: './pulse-loader.component.scss',
})
export class PulseLoaderComponent {
  @Input() color = '#fff'
}
