export enum EContent {
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
  barCode: string
  description: string | null
  accessories: unknown
  badgeIds: unknown
  badges: unknown
  bookingDateTo: string | null
  brandName: string | null
  brandPhotoUrl: string | null
  breadcrumbs: unknown
  bundleIsInCart: boolean
  bundleRequestedQuantity: number | null
  bundleTotalPreviousPrice: number | null
  bundles: unknown
  categoryId: number
  categoryIds: number[] | null
  categoryName: string
  categoryRoute: string | null
  certificateFileUrl: string | null
  disableBuyButton: boolean
  disabledPopup: boolean
  discountAmount: number
  discountPercent: number
  discountType: string | null
  doNotRecordStock: boolean
  giftType: string | null
  gifts: unknown
  h1: string | null
  hasDiscount: boolean
  iconUrl: string | null
  imageAlt: string | null
  imageUrl: string | null
  images: string[] | null
  isBooked: boolean
  isFavorite: boolean
  isInCart: boolean
  isKyosk: boolean
  isNightPromotion: boolean
  isPriceSubscribed: boolean
  isPurchased: boolean
  isStockSubscribed: boolean
  keySpecification: unknown
  labelColor: string | null
  labelText: string | null
  mainSpecification: unknown
  manualsFileUrl: string | null
  maxQuantityInCart: number
  metaDescription: string | null
  metaTitle: string | null
  metaUrlName: string | null
  onSale: boolean
  onSaleSoon: boolean
  orderNo: number
  parentCategoryName: string
  preSalePrice: number | null
  previousPrice: number | null
  price: number
  productDetailsFrame: unknown
  productFrame: unknown
  productFrameResponsive: unknown
  productHorizontalFrame: unknown
  productHorizontalFrameResponsive: unknown
  promotionFinishDate: string | null
  promotionQuantity: number | null
  releaseDate: string | null
  requestedQuantity: number
  route: string
  routeEn: string | null
  routeGe: string | null
  routeIsNotValid: boolean | null
  routeRu: string | null
  sellType: string | null
  shareRoute: string | null
  shopId: number | null
  shopName: string | null
  similarProductsList: unknown
  specificationGroup: unknown
  subCategoryId: number
  subCategoryName: string | null
  storageQuantity: number
  videoUrls: string[] | null
}
