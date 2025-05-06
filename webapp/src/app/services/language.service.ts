import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<'en' | 'ka'>('en')
  currentLanguage$ = this.currentLanguageSubject.asObservable()

  setLanguage(language: 'en' | 'ka'): void {
    this.currentLanguageSubject.next(language)
    localStorage.setItem('language', language)
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value
  }

  loadLanguageFromStorage(): void {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ka' | null
    if (savedLanguage) {
      this.currentLanguageSubject.next(savedLanguage)
    }
  }
}
