export interface ICart {
  cartId: number
  totalPrice: number
  totalPreviousPrice: number
  totalCount: number
  items: ICartItem[]
  bundles: unknown
  gifts: unknown
  httpStatusCode: number
  success: boolean
  errors: string[]
  userMessage: string | null
  developerMessage: string | null
}

export interface ICartItem {
  productId: number
  productName: string
  quantity: number
  price: number
  previousPrice: number | null
  imageUrl: string
  priceFromBooking: boolean
  storageQuantity: number
  totalStorageQuantity: number
  gifts: string[]
}
