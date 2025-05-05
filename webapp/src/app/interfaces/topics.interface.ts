export interface ITopicItem {
  id: number
  title: string
  orderNo: number
  urlName: string
  metaTitle: string
  h1: string
  metaDescription: string
}

export interface ITopicsResponse {
  showInTopMenu: ITopicItem[]
  firstFooter: ITopicItem[]
  secondFooter: ITopicItem[]
  showInBlocks: ITopicItem[]
  httpStatusCode: number
  userMessage: string | null
  developerMessage: string | null
  success: boolean
  errors: unknown[]
}
