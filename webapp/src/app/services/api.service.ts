import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ITopicsResponse } from '../interfaces/topics.interface'
import { Observable } from 'rxjs'
import { IContentResponse } from '../interfaces/content.interface'
import { IMegaMenu } from '../interfaces/mega-menu.interface'
import { ITopicResponse } from '../interfaces/topic.interface'
import { IProductsResponse, ProductsOptions } from '../interfaces/products.interface'
import { IFilterResponse } from '../interfaces/filter.interface'

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

  topic(lang: string, title: string): Observable<ITopicResponse> {
    return this.httpClient.get<ITopicResponse>(this.serverUrl + 'topic?title=' + title.toString(), {
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

  products(options: ProductsOptions): Observable<IProductsResponse> {
    const { lang, page, limit, specificationIds, categoryId, categories, priceFrom, priceTo } = options
    return this.httpClient.get<IProductsResponse>(this.serverUrl + 'products', {
      headers: {
        'accept-language': lang,
      },
      params: {
        Page: String(page),
        Limit: String(limit),
        ...(categoryId != null ? { CategoryId: String(categoryId) } : {}),
        ...(categories != null ? { Categories: String(categories) } : {}),
        ...(specificationIds ? { SpecificationIds: specificationIds } : {}),
        ...(priceFrom ? { MinPrice: priceFrom } : {}),
        ...(priceTo ? { MaxPrice: priceTo } : {}),
      },
    })
  }

  filter(lang: string, catId: number): Observable<IFilterResponse> {
    return this.httpClient.get<IFilterResponse>(this.serverUrl + 'filter', {
      headers: {
        'accept-language': lang,
      },
      params: {
        catId,
      },
    })
  }
}
