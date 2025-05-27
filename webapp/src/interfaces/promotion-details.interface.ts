export interface IPromotionDetailsResponse {
  item: IPromotion
  categories: Category[]
  items: IPromotionItem[]
  errors: string[]
  httpStatusCode: number
  success: boolean
  developerMessage: string | null
  userMessage: string | null
}

export interface Category {
  id: number
  name: StringConstructor
}

export interface IPromotionItem {
  id: number
  name: string
  price: number
  previousPrice: number | null
  barCode: string
  brandName: string | null
  imageUrl: string
  categoryId: number
  categoryName: string
  parentCategoryName: string
  subCategoryId: number
  discountAmount: number
  discountPercent: number
  hasDiscount: boolean
  labelText: string
  labelColor: string
  isBooked: boolean
  isFavorite: boolean
  isInCart: boolean
  isPurchased: boolean
  requestedQuantity: number
  route: string
  storageQuantity: number
  bundleIsInCart: boolean
  disableBuyButton: boolean
  badgeIds: number[] | null
  badges: unknown
  giftType: unknown
  gifts: unknown
  iconUrl: string | null
  onSale: boolean
  onSaleSoon: boolean
  orderNo: number
  preSalePrice: number | null
  productFrame: string | null
  productFrameResponsive: string | null
}

export interface IPromotion {
  id: number
  name: string
  desktopImageUrl: string
  mobileImageUrl: string
  orderNo: number | null
  finishDate: string | null
  route: string | null
}
