import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { ISpecificationGroup } from 'webapp/src/interfaces/product.interface'
import { ViewportService } from 'webapp/src/app/services/viewport.service'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-features',
  imports: [TranslateModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent implements OnInit, AfterViewInit {
  @Input() features?: ISpecificationGroup[]
  public isSeeMore = false
  public isActive = true
  public currentMarginBottom = 10
  public marginBottomMap: Record<number, number> = {}
  public viewportWidth = 0

  @ViewChild('spec') spec?: ElementRef<HTMLElement>

  constructor(private viewport: ViewportService) {}

  ngOnInit(): void {
    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
  }

  ngAfterViewInit(): void {
    if (this.spec) {
      console.log(this.spec?.nativeElement.offsetHeight - 46)
    }
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
