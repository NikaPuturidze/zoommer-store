import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { AccesoriesComponent } from './accesories/accesories.component'
import { SimmilarComponent } from './simmilar/similar.component'
import { FeaturesComponent } from './features/features.component'
import { WarrantyComponent } from './warranty/warranty.component'
import { BranchesComponent } from './branches/branches.component'
import { IProduct, IProductResponse } from '../../../interfaces/product.interface'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { TranslateModule } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { fromEvent, throttleTime, map } from 'rxjs'
import { ViewportService } from '../../services/viewport.service'
import { AsyncPipe } from '@angular/common'

@UntilDestroy()
@Component({
  selector: 'app-additional-info',
  imports: [
    AccesoriesComponent,
    SimmilarComponent,
    FeaturesComponent,
    WarrantyComponent,
    BranchesComponent,
    ContentLoaderModule,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnInit {
  @Input() product?: IProduct
  @Input() productResponse?: IProductResponse
  public isSticky = false
  public scroll = 0
  public activeSection = 0
  sectionsMap: { key: string | null; element: ElementRef<HTMLDivElement> }[] = []

  @ViewChildren('observeSection', { read: ElementRef }) sections?: QueryList<ElementRef<HTMLDivElement>>

  constructor(
    private cdr: ChangeDetectorRef,
    public viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.listenToScroll()
  }

  public listenToScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(10),
        map(() => window.scrollY),
        untilDestroyed(this)
      )
      .subscribe((scroll) => {
        this.isSticky = scroll >= 1075
        this.scroll = scroll

        this.sections?.forEach((section) => {
          const rect = section.nativeElement.getBoundingClientRect()
          const offset = 160

          if (rect.top <= offset && rect.bottom > offset) {
            this.activeSection = Number(section.nativeElement.getAttribute('data-section'))
          }
        })
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
        if (nearBottom && this.sections) {
          this.activeSection = this.sections.length - 1
        }
        this.cdr.markForCheck()
      })
  }
}
