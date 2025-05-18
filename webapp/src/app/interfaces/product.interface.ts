export interface IProductResponse {
  product: IProduct
  availabilityInStores: IAvailabilityInStores[]
  translations: ITranslations
}

export interface IAvailabilityInStores {
  address: string
  branchName: string
  city: string
  id: number
  inStock: boolean
  phoneNumber: string
  workingHoursMonToSat: string
  workingHoursSun: string
}

export interface IProduct {
  id: number
  name: string
  barCode: string
  description: unknown
  sellType: string
  maxQuantityInCart: number
  price: number
  previousPrice?: number | null
  categoryId: number
  doNotRecordStock: boolean
  categoryIds: number[]
  parentCategoryName: string
  categoryName: string
  subCategoryId: number
  releaseDate: unknown
  storageQuantity: number
  requestedQuantity: number
  promotionQuantity: number
  imageUrl: string
  shopId: number
  shopName: string
  images: string[]
  isPurchased: boolean
  orderNo: number
  discountPercent: number
  hasDiscount: boolean
  discountAmount: number
  discountType: unknown
  isFavorite: boolean
  preSalePrice: unknown
  onSale: boolean
  isKyosk: boolean
  badges: unknown
  badgeIds: unknown
  disableBuyButton: boolean
  onSaleSoon: boolean
  h1: string
  metaDescription: unknown
  metaTitle: string
  metaUrlName: unknown
  specificationGroup: ISpecificationGroup[]
  mainSpecification: IMainSpecification[]
  keySpecification: IKeySpecification[]
  similarProductsList: ISimilarProductsList[]
  bundles: IBundle[]
  accessories: IAccessory[]
  bundleTotalPreviousPrice: number
  isBooked: boolean
  videoUrls: unknown[]
  bookingDateTo: unknown
  isInCart: boolean
  bundleIsInCart: boolean
  bundleRequestedQuantity: number
  isPriceSubscribed: boolean
  isStockSubscribed: boolean
  categoryRoute: unknown
  route: string
  isNightPromotion: boolean
  breadcrumbs: IBreadcrumb[]
  gifts: unknown
  giftType: unknown
  imageAlt: unknown
  labelText: unknown
  labelColor: unknown
  iconUrl: unknown
  routeIsNotValid: unknown
  subCategoryName: string
  manualsFileUrl: string
  certificateFileUrl: string
  productFrame: unknown
  productFrameResponsive: unknown
  productDetailsFrame: unknown
  productHorizontalFrame: unknown
  productHorizontalFrameResponsive: unknown
  currentImage: number
  translateX: number
}

export interface ISpecificationGroup {
  id: number
  groupName: string
  orderNo: number
  isActive: boolean | null
  specifications: ISpecification[]
}

export interface ISpecification {
  id: number
  isInProductPage: boolean
  specificationGroupId: number
  specificationName: string
  orderNo: number
  isColor: boolean
  colorValue?: string | null
  specificationMeaningId: number
  specificationMeaning: string
  isMainSpecification: boolean
  mainSpecificationOrderNo?: number | null
  specificationLinkedUrl?: string | null
}

export interface IMainSpecification {
  id: number
  specificationName: string
  specificationMeaning: string
  orderNo: number
}

export interface IKeySpecification {
  specificationName: string
  isColor: boolean
  specificationMeaning: string
  orderNo: number
  specificationMeaningsList: ISpecificationMeaning[]
}

export interface ISpecificationMeaning {
  isColor: boolean
  value: string
  isSelected: boolean
  productId: number
  orderNo: number
  route: string
}

export interface IBundle {
  id: number
  categoryId: number
  discountAmount: number
  discountIsPercent: boolean
  isMain: boolean
  orderNo: number
  productId: number
  productName: string
  productUrl: string
  productPrice: number
  productSalePrice: number
  productPriceWithoutLogic: number
  isInCart: boolean
  isFavorite: boolean
  disableBuyButton: boolean
  onSaleSoon: boolean
  storageQuantity: number
  requestedQuantity: number
  categories: unknown
  route: string
  labelColor?: string
  labelText?: string
  iconUrl?: string
}

export interface IAccessory {
  id: number
  categoryId: number
  discountAmount: number
  discountIsPercent: boolean
  isMain: boolean
  orderNo: number
  productId: number
  productName: string
  productUrl: string
  productPrice: number
  productSalePrice: number
  productPriceWithoutLogic: number
  isInCart: boolean
  isFavorite: boolean
  disableBuyButton: boolean
  onSaleSoon: boolean
  storageQuantity: number
  requestedQuantity: number
  categories: unknown
  route: string
  labelColor?: string
  labelText?: string
  iconUrl?: string
}

export interface ISimilarProductsList {
  disableBuyButtom: boolean
  iconUrl: string | null
  imageUrls: string[]
  isFavorite: boolean
  isInCart: boolean
  labelColor: string | null
  labelText: string | null
  onSaleSoon: boolean
  previousPrice: number | null
  price: number
  productId: number
  productName: string
  requestedQuantity: number
  route: string
  storageQuantity: number
}

export interface IBreadcrumb {
  id: number
  name: string
  route: string
  imageUrl: string
}

export interface ITranslations {
  main: string
  bundles: {
    title: string
    addItem: string
    totalPrice: string
    buy: string
  }
  additionalInfo: {
    title: string[]
  }
  similar: {
    title: string
  }
  features: {
    title: string
    seeLess: string
    seeMore: string
  }
  warranty?: {
    warranty?: {
      title: string
      button: string
    }
    manual?: {
      title: string
      button: string
    }
    certificate?: {
      title: string
      button: string
    }
  }
  branches: {
    title: string
    inStock: string
    notInStock: string
    soon: string
    monSat: string
    sun: string
    seeLess: string
    seeMore: string
  }
  buy: {
    display: number
    atBranches: string
    insurance: string
    control: string
    reservation: string
    buy: string
    compare: string
    add: string
  }
}
