import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { Observable } from 'rxjs'
import { ICategoryItem } from '../interfaces/mega-menu.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl = 'http://localhost:3000/api/'

  topics(lang: string): Observable<ITopicsResponse> {
    return this.httpClient.get<ITopicsResponse>(this.serverUrl + 'topics', {
      headers: {
        'accept-language': lang,
      },
    })
  }

  megaMenu(): Observable<ICategoryItem> {
    return this.httpClient.get<ICategoryItem>(this.serverUrl + 'mega-menu')
  }
}
