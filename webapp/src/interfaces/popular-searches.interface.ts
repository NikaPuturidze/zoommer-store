export interface IPopularSearchesResponse {
  developerMessage: string | null
  errors: string[]
  httpStatusCode: number
  popularCategories: IPopularCategory[]
  popularSearches: string[]
  success: boolean
  userMessage: string | null
}

export interface IPopularCategory {
  id: number
  orderNo: number
  name: string
  parentCategoryId: number | null
  parentCategoryName: string | null
  googleCategoryId: number | null
  h1: string | null
  iconForMainUrl: string
  iconUrl: string
  isParentCategory: boolean
  metaDescription: string | null
  metaTitle: string | null
  route: string
  shopId: number
  subCategoryIds: number[] | null
}
