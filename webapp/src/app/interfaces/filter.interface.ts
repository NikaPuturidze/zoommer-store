export enum EFilter {
  GAP = 19,
  VALUE_HEIGHT = 24,
}

export interface IFilterResponse {
  specifications: ISpecification[]
  minPrice: number
  maxPrice: number
  success: boolean
  developerMessage: string | null
  userMessage: string | null
  errors: unknown[]
  httpStatusCode: number
}

export interface ISpecification {
  id: number
  name: string
  nameUrlFriendly: string
  values?: ISpecificationValue[]
  active?: undefined | boolean
  valuesAmount: number
  showAll: boolean | null
}

export interface ISpecificationValue {
  id: number
  value: string
  valueUrlFriendly: string
}
