export enum EImage {
  SMALL = 220,
  LARGE = 895,
  GAP = 30,
  SLIDER_WIDTH = 1170,
  SLIDER_ONE_WIDTH = 160,
  SLIDER_ONE_OFFSET = 195,
  SLIDER_TWO_WIDTH = 355,
  SLIDER_TWO_OFFSET = 390,
}

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
  widthInPixels: number
  heightInPixels: number
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
