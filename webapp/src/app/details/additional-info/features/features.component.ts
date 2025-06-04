import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { ISpecificationGroup } from 'webapp/src/interfaces/product.interface'
import { ViewportService } from 'webapp/src/app/services/viewport.service'
import { TranslateModule } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'app-features',
  imports: [TranslateModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent implements OnInit {
  @Input() features?: ISpecificationGroup[]
  public isSeeMore = false
  public isActive = true
  public currentMarginBottom = 10
  public marginBottomMap: Record<number, number> = {}
  public viewportWidth = 0

  @ViewChild('sp') sp?: ElementRef<HTMLDivElement>

  constructor(
    private viewport: ViewportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewport.Viewport$.pipe(untilDestroyed(this)).subscribe((values) => {
      this.viewportWidth = values.width
      this.cdr.markForCheck()
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
