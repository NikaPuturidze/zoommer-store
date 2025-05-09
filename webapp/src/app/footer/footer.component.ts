import { Component, Input, OnChanges } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnChanges {
  @Input() topics?: ITopicsResponse

  ngOnChanges(): void {
    console.log(this.topics)
  }
}
