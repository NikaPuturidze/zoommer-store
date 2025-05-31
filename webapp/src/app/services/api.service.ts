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
import { IUser } from 'webapp/src/interfaces/user.interface'
import { IToken } from 'webapp/src/interfaces/token.interface'
import { ILogin } from 'webapp/src/interfaces/login.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl = 'http://localhost:3000/api/'

  public topics(): Observable<ITopicsResponse> {
    return this.httpClient.get<ITopicsResponse>(this.serverUrl + 'topics')
  }

  public topic(title: string): Observable<ITopicResponse> {
    return this.httpClient.get<ITopicResponse>(this.serverUrl + 'topic?title=' + title.toString())
  }

  public megaMenu(): Observable<IMegaMenu[]> {
    return this.httpClient.get<IMegaMenu[]>(this.serverUrl + 'mega-menu')
  }

  public content(): Observable<IContentResponse> {
    return this.httpClient.get<IContentResponse>(this.serverUrl + 'content')
  }

  public products(options: ProductsOptions): Observable<IProductsResponse> {
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

  public filter(catId: number): Observable<IFilterResponse> {
    return this.httpClient.get<IFilterResponse>(this.serverUrl + 'filter', {
      params: {
        catId,
      },
    })
  }

  public details(productId: number): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(this.serverUrl + 'details', {
      params: {
        productId,
      },
    })
  }

  public allCategories(): Observable<IAllCategory[]> {
    return this.httpClient.get<IAllCategory[]>(this.serverUrl + 'all-categories')
  }

  public promotion(): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.serverUrl + 'promotion')
  }

  public promotionDetail(
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

  public accessToken(): Observable<{ token: string }> {
    return this.httpClient.get<{ token: string }>(this.serverUrl + 'cookie')
  }

  public user(username: string): Observable<IUser> {
    return this.httpClient.post<IUser>(this.serverUrl + 'user', {
      username,
    })
  }

  public login(username: string, code: string): Observable<ILogin> {
    return this.httpClient.post<ILogin>(this.serverUrl + 'login', {
      username,
      code,
    })
  }

  public token(credintails: { email: string; password: string }): Observable<IToken> {
    return this.httpClient.post<IToken>(this.serverUrl + 'token', {
      email: credintails.email,
      password: credintails.password,
    })
  }
}
