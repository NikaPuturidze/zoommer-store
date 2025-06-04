import { IProduct } from './products.interface'

export interface IWishList {
  productItems: IProduct[]
  httpStatusCode: number
  userMessage: string | null
  developerMessage: string | null
  success: boolean
  errors: string[]
}
