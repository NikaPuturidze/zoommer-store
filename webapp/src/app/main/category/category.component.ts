import { Component, Input, OnInit } from '@angular/core'
import { IMegaMenu } from '../../../interfaces/mega-menu.interface'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ContentLoaderModule } from '@ngneat/content-loader'
import { BurgerService } from '../../services/burger.service'
import { ViewportService } from '../../services/viewport.service'
import { TranslateService } from '@ngx-translate/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { skip } from 'rxjs'
@UntilDestroy()
@Component({
  selector: 'app-category',
  imports: [CommonModule, ContentLoaderModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  public megaMenu: IMegaMenu[] | undefined
  public isInCategory = false
  public currentCategory = -1
  public viewportWidth = 0
  @Input() width = 0

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private burgerService: BurgerService,
    private viewport: ViewportService
  ) {}

  ngOnInit(): void {
    this.loadMegaMenu()
    this.translateService.onLangChange.pipe(skip(1), untilDestroyed(this)).subscribe(() => {
      this.loadMegaMenu()
    })

    this.viewport.Viewport$.subscribe((values) => {
      this.viewportWidth = values.width
    })
  }

  private loadMegaMenu(): void {
    this.burgerService.getMegaMenu().subscribe({
      next: (data: IMegaMenu[] | undefined) => {
        this.megaMenu = data
      },
      error: (error: unknown) => {
        console.error(error)
      },
    })
  }

  public getHeight(index: number): string {
    const heightBefore = ['555.5px', '409px', '580px', '745.5px', '483px', '483px', '378px', '378px']
    const heightAfter = ['650px', '600px', '675px', '850px', '575px', '537px', '500px', '455px']
    return this.viewportWidth > 1200 ? heightBefore[index] : heightAfter[index]
  }

  public getCurrentCategory(index: number): void {
    this.currentCategory = index
    this.isInCategory = true
  }

  public resetCurrentCategory(): void {
    this.currentCategory = -1
    this.isInCategory = false
  }

  public formatUrl(url: string): string {
    return url?.split('https://zoommer.ge/')[1]
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
