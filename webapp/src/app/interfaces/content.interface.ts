export interface IContentResponse {
  section: ISection[]
}

export interface ISection {
  id: number
  bannerPosition: number | null
  bannerFinishDate: string | null
  bannerTemplateRowNumber: number
  sectionType: number
  title: string | null
  promotionFinishDate: string | null
  products: IProduct[] | null
  activeOrders: unknown
  banners: IBanner[] | null
  brands?: unknown
  categories?: unknown
  colorValue?: string | null
  isAbsoulteRoute: boolean
  isActiveOrderSection: boolean
  isScroll?: boolean | null
  orderNumber: number
  promotionProducts?: unknown
  route: string | null
}

export interface IBanner {
  title: string
  bannerType: number
  productId: number | null
  promotionId: number | null
  isAbsoluteUrl?: boolean
  largeBanner?: boolean
  mobileDimensions?: IDimensions | null
  mobileImageUrl?: string | null
  webDimensions?: IDimensions | null
  webImageUrl?: string | null
  orderNo: number
  position: number
  route: string
}

export interface IDimensions {
  width: number
  height: number
}

export interface IProduct {
  id: number
  name: string
  price: number
  previousPrice?: number | null
  discountAmount?: number | null
  discountPercent?: number | null
  barCode?: string | null
  brandName?: string
  categoryId: number
  categoryName: string
  parentCategoryName?: string
  onSale?: boolean
  onSaleSoon?: boolean
  hasDiscount?: boolean
  preSalePrice?: number | null
  imageUrl?: string
  iconUrl?: string | null
  labelText?: string | null
  labelColor?: string | null
  bundleIsInCart?: boolean
  isBooked?: boolean
  isFavorite?: boolean
  isInCart?: boolean
  isPurchased?: boolean
  disableBuyButton?: boolean
  doNotRecordStock?: boolean
  giftType?: unknown
  gifts?: unknown
  productFrame?: unknown
  productFrameResponsive?: unknown
  requestedQuantity?: number
  storageQuantity?: number
  route: string
  orderNo?: number
}
