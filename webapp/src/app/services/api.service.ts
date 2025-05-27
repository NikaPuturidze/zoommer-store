import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ITopicsResponse } from '../../interfaces/topics.interface'
import { Observable } from 'rxjs'
import { IContentResponse } from '../../interfaces/content.interface'
import { IMegaMenu } from '../../interfaces/mega-menu.interface'
import { ITopicResponse } from '../../interfaces/topic.interface'
import { IProductsResponse, ProductsOptions } from '../../interfaces/products.interface'
import { IFilterResponse } from '../../interfaces/filter.interface'
import { IProductResponse } from '../../interfaces/product.interface'
import { IAllCategory } from '../../interfaces/all-categories.interface'
import { IPromotion } from '../../interfaces/promotion.interface'
import { IPromotionDetailsResponse } from '../../interfaces/promotion-details.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl = 'http://localhost:3000/api/'

  topics(): Observable<ITopicsResponse> {
    return this.httpClient.get<ITopicsResponse>(this.serverUrl + 'topics')
  }

  topic(title: string): Observable<ITopicResponse> {
    return this.httpClient.get<ITopicResponse>(this.serverUrl + 'topic?title=' + title.toString())
  }

  megaMenu(): Observable<IMegaMenu[]> {
    return this.httpClient.get<IMegaMenu[]>(this.serverUrl + 'mega-menu')
  }

  content(): Observable<IContentResponse> {
    return this.httpClient.get<IContentResponse>(this.serverUrl + 'content')
  }

  products(options: ProductsOptions): Observable<IProductsResponse> {
    const { page, limit, specificationIds, categoryId, categories, priceFrom, priceTo, priceAsc, nameAsc } = options
    return this.httpClient.get<IProductsResponse>(this.serverUrl + 'products', {
      params: {
        Page: String(page),
        Limit: String(limit),
        ...(categoryId != null ? { CategoryId: String(categoryId) } : {}),
        ...(categories != null ? { Categories: String(categories) } : {}),
        ...(specificationIds ? { SpecificationIds: specificationIds } : {}),
        ...(priceFrom ? { MinPrice: priceFrom } : {}),
        ...(priceTo ? { MaxPrice: priceTo } : {}),
        ...(priceAsc !== undefined && typeof priceAsc == 'boolean' ? { PriceAsc: String(priceAsc) } : {}),
        ...(nameAsc !== undefined && typeof nameAsc == 'boolean' ? { NameAsc: String(nameAsc) } : {}),
      },
    })
  }

  filter(catId: number): Observable<IFilterResponse> {
    return this.httpClient.get<IFilterResponse>(this.serverUrl + 'filter', {
      params: {
        catId,
      },
    })
  }

  details(productId: number): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(this.serverUrl + 'details', {
      params: {
        productId,
      },
    })
  }

  allCategories(): Observable<IAllCategory[]> {
    return this.httpClient.get<IAllCategory[]>(this.serverUrl + 'all-categories')
  }

  promotion(): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.serverUrl + 'promotion')
  }

  promotionDetail(
    page: number,
    limit: number,
    promotionId: number,
    categoryIds?: number[]
  ): Observable<IPromotionDetailsResponse> {
    return this.httpClient.get<IPromotionDetailsResponse>(this.serverUrl + 'promotion-detail', {
      params: {
        Page: String(page),
        Limit: String(limit),
        PromotionId: String(promotionId),
        ...(categoryIds ? { CategoryIds: categoryIds.join(',') } : {}),
      },
    })
  }

  accessToken(): Observable<{ token: string }> {
    return this.httpClient.get<{ token: string }>(this.serverUrl + 'cookie')
  }
}
