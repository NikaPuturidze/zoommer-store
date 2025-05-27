import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'
import { LanguageService } from '../services/language.service'
import { ActivatedRoute } from '@angular/router'
import { ITopicResponse } from '../../interfaces/topic.interface'
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser'
import { Subject, combineLatest, takeUntil } from 'rxjs'

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit, OnDestroy {
  public topic?: ITopicResponse
  public content?: SafeHtml
  public currentLang: 'en' | 'ka' = 'en'
  private destroy$ = new Subject<void>()

  constructor(
    private readonly apiService: ApiService,
    private languageService: LanguageService,
    private actR: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private title: Title
  ) {}

  ngOnInit(): void {
    combineLatest([this.languageService.currentLanguage$, this.actR.params])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([language, parameters]) => {
        this.currentLang = language
        this.loadTopic(parameters['topic'] as string)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadTopic(paramater: string): void {
    this.apiService.topic(paramater).subscribe({
      next: (data: ITopicResponse) => {
        this.title.setTitle(data.title + ' • Zoommer')
        this.topic = data
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.topic.content)
      },
      error: (error: ErrorOptions) => {
        console.error('Failed to load topic', error)
      },
    })
  }
}
