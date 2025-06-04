import { Component, HostListener, OnInit, Renderer2 } from '@angular/core'
import { SearchService } from '../services/search.service'
import { AsyncPipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UniqueArrayPipe } from '../services/pipes/unique-array.pipe'
import { PulseLoaderComponent } from '../ui/loaders/pulse-loader/pulse-loader.component'
import { Router, RouterModule } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { ViewportService } from '../services/viewport.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'app-search-popup',
  imports: [AsyncPipe, TranslateModule, ReactiveFormsModule, UniqueArrayPipe, PulseLoaderComponent, RouterModule],
  templateUrl: './search-popup.component.html',
  styleUrl: './search-popup.component.scss',
})
export class SearchPopupComponent implements OnInit {
  public lastSearched: string[] = []
  public route = ''

  constructor(
    private renderer: Renderer2,
    private cookie: CookieService,
    private viewport: ViewportService,
    private router: Router,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.isSearching$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.viewport.Viewport$.subscribe((values) => {
        if (value && values.width > 1024) {
          this.getLastSearched()
          this.renderer.addClass(document.body, 'no-scroll')
        } else this.renderer.removeClass(document.body, 'no-scroll')
      })
    })
  }

  @HostListener('click')
  public endSearch(): void {
    this.searchService.endSearch()
  }

  public getLastSearched(): void {
    if (this.cookie.check('last-searched')) {
      this.lastSearched = JSON.parse(this.cookie.get('last-searched')) as string[]
    }
  }

  public removeSearched(): void {
    this.cookie.delete('last-searched')
    this.lastSearched = []
  }

  public toggleCategoryId(id: number): void {
    if (this.searchService.categoryIds.includes(id)) {
      this.searchService.categoryIds.splice(this.searchService.categoryIds.indexOf(id), 1)
    } else {
      this.searchService.categoryIds.push(id)
    }
    this.searchService.toggleCategory()
  }

  public navigateTo(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
    this.searchService.endSearch()
  }
}
