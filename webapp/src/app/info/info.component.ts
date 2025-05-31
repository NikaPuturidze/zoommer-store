import { Component, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ITopicResponse } from '../../interfaces/topic.interface'
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser'
import { combineLatest } from 'rxjs'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
@UntilDestroy()
@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  public topic?: ITopicResponse
  public content?: SafeHtml
  public currentLang: 'en' | 'ka' = 'en'

  constructor(
    private apiService: ApiService,
    private languageService: LanguageService,
    private actR: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.languageService.currentLanguage$, this.actR.params])
      .pipe(untilDestroyed(this))
      .subscribe(([language, parameters]) => {
        this.currentLang = language
        this.loadTopic(parameters['topic'] as string)
      })
  }

  private loadTopic(paramater: string): void {
    this.apiService.topic(paramater).subscribe({
      next: (data: ITopicResponse) => {
        this.title.setTitle(data.title + ' • Zoommer')
        this.topic = data
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.topic.content)
        if (!data.success) {
          this.navigate(['/not-found'])
        }
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load topic', error)
      },
    })
  }

  public navigate(route: string[]): void {
    this.router.navigate(route).catch((error: unknown) => {
      console.error(error)
    })
  }
}
