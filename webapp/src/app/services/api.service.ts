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
import { IPopularSearchesResponse } from 'webapp/src/interfaces/popular-searches.interface'
import { ICart } from 'webapp/src/interfaces/cart.interface'
import { IProfile } from 'webapp/src/interfaces/profile.interface'
import { IRenew } from 'webapp/src/interfaces/renew.interface'
import { IWishList } from 'webapp/src/interfaces/wishlist.interface'
import { IClearAllWishlist } from 'webapp/src/interfaces/clear-all-wishlist.interface'
import { ISetSubscribe } from 'webapp/src/interfaces/set-subscribe.interface'
import { ICartPost } from 'webapp/src/interfaces/cart-post.interfase'
import { IAddFavourite } from 'webapp/src/interfaces/add-favourite.interface'
import { IDeleteFavourite } from 'webapp/src/interfaces/delete-favaourite.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  private serverUrl = 'http://localhost:3000/api/'
  // private serverUrl = 'https://api.darkhost.space/zoommer/api/'

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
    const {
      page,
      limit,
      name,
      notInStock,
      specificationIds,
      categoryId,
      categories,
      priceFrom,
      priceTo,
      priceAsc,
      nameAsc,
    } = options
    return this.httpClient.get<IProductsResponse>(this.serverUrl + 'products', {
      params: {
        Page: String(page),
        Limit: String(limit),
        ...(name != null ? { Name: String(name) } : {}),
        ...(notInStock != null ? { NotInStock: String(notInStock) } : {}),
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

  public popularSearches(): Observable<IPopularSearchesResponse> {
    return this.httpClient.get<IPopularSearchesResponse>(this.serverUrl + 'popular-searches')
  }

  public cart(): Observable<ICart> {
    return this.httpClient.get<ICart>(this.serverUrl + 'cart')
  }

  public cartPost(productId: number, quantity: number): Observable<ICartPost> {
    return this.httpClient.post<ICartPost>(this.serverUrl + 'cart', {
      productId,
      quantity,
    })
  }

  public profile(): Observable<IProfile> {
    return this.httpClient.get<IProfile>(this.serverUrl + 'profile')
  }

  public renew(
    citizenOfAnotherCountry: boolean,
    email: string,
    lastName: string,
    name: string,
    personalNumber: string
  ): Observable<IRenew> {
    return this.httpClient.post<IRenew>(this.serverUrl + 'renew', {
      citizenOfAnotherCountry,
      email,
      lastName,
      name,
      personalNumber,
    })
  }

  public wishlist(): Observable<IWishList> {
    return this.httpClient.get<IWishList>(this.serverUrl + 'wishlist')
  }

  public clearAllWishList(): Observable<IClearAllWishlist> {
    return this.httpClient.post<IClearAllWishlist>(this.serverUrl + 'clear-all-wishlist', {})
  }

  public addFavourite(productId: number): Observable<IAddFavourite> {
    return this.httpClient.post<IAddFavourite>(this.serverUrl + 'add-favourite', { productId })
  }

  public deleteFavourite(id: number): Observable<IDeleteFavourite> {
    return this.httpClient.post<IDeleteFavourite>(this.serverUrl + 'delete-favourite', { id })
  }

  public setSubscribe(set: boolean): Observable<ISetSubscribe> {
    return this.httpClient.post<ISetSubscribe>(this.serverUrl + 'set-subscribe', {
      subscribe: set,
    })
  }
}
