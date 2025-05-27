import { Component, Input, OnInit } from '@angular/core'
import { ISpecificationGroup, ITranslations } from 'webapp/src/interfaces/product.interface'
import { ViewportService } from 'webapp/src/app/services/viewport.service'

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent implements OnInit {
  @Input() features?: ISpecificationGroup[]
  @Input() translations?: ITranslations
  public isSeeMore = false
  public isActive = true
  public currentMarginBottom = 10
  public marginBottomMap: Record<number, number> = {}
  public viewportWidth

  constructor(private viewport: ViewportService) {}

  ngOnInit(): void {
    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
  }

  public toggleSeeMore(): void {
    this.isSeeMore = !this.isSeeMore
  }

  public toggleIsActive(index: number): void {
    if (!this.features) return

    const isNowActive = !this.features[index].isActive
    this.features[index].isActive = isNowActive

    if (isNowActive) {
      this.marginBottomMap[index] = 40
    }
  }

  public onTransitionEnd(event: TransitionEvent, index: number): void {
    if (event.propertyName !== 'max-height' || !this.features) return

    if (!this.features[index].isActive) {
      this.marginBottomMap[index] = 10
    }
  }
}
