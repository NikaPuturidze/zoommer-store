export interface IAllCategory {
  id: number
  name: string
  orderNo: number
  url: string
  googleCategoryId?: number | null
  childCategories?: IAllCategory[]
}
