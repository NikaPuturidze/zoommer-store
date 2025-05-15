import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnDestroy {
  private subjects = new Map<string, BehaviorSubject<string | null>>()
  private storageListener: (event: StorageEvent) => void

  constructor() {
    this.storageListener = (event: StorageEvent) => {
      const { key, newValue } = event
      if (key && this.subjects.has(key)) {
        this.getSubject(key).next(newValue)
      }
    }
    window.addEventListener('storage', this.storageListener)
  }

  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value)
    this.getSubject(key).next(value)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
    this.getSubject(key).next(null)
  }

  observe(key: string): Observable<string | null> {
    return this.getSubject(key).asObservable()
  }

  private getSubject(key: string): BehaviorSubject<string | null> {
    let subj = this.subjects.get(key)
    if (!subj) {
      const initial = localStorage.getItem(key)
      subj = new BehaviorSubject<string | null>(initial)
      this.subjects.set(key, subj)
    }
    return subj
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageListener)
    this.subjects.forEach((subjects) => {
      subjects.complete()
    })
    this.subjects.clear()
  }
}
