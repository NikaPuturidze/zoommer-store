import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { Observable } from 'rxjs'
import { IContentResponse } from '../interfaces/content.interface'
import { IMegaMenu } from '../interfaces/mega-menu.interface'

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

  megaMenu(lang: string): Observable<IMegaMenu[]> {
    return this.httpClient.get<IMegaMenu[]>(this.serverUrl + 'mega-menu', {
      headers: {
        'accept-language': lang,
      },
    })
  }

  content(lang: string): Observable<IContentResponse> {
    return this.httpClient.get<IContentResponse>(this.serverUrl + 'content', {
      headers: {
        'accept-language': lang,
      },
    })
  }
}
