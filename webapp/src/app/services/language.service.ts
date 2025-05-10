import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<'en' | 'ka'>(this.getInitialLanguage())
  currentLanguage$ = this.currentLanguageSubject.asObservable()

  private getInitialLanguage(): 'en' | 'ka' {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ka' | null
    return savedLanguage ?? 'en'
  }

  setLanguage(language: 'en' | 'ka'): void {
    this.currentLanguageSubject.next(language)
    localStorage.setItem('language', language)
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value
  }
}
