export interface IProductsResponse {
  categories: ICategory[]
  category1: string
  category2: string
  categoryName: string
  categoryRouteEn: string | null
  categoryRouteGe: string | null
  categoryRouteRu: string | null
  h1: string | null
  metaDescription: string | null
  metaTitle: string | null
  popularSearches: string[]
  products: IProduct[]
  productsCount: number
}

export interface ICategory {
  categoryId: number
  name: string
  route: string | null
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

export interface IBaseParameters {
  lang: string
  page: number
  limit: number
  specificationIds?: string
  priceFrom?: number
  priceTo?: number
  priceAsc?: boolean
  nameAsc?: boolean
}

export type ProductsOptions = IBaseParameters &
  ({ categoryId: number; categories?: never } | { categories: number; categoryId?: never })

export interface ICategoryInfo {
  catId: number
  isSuper: boolean
}
