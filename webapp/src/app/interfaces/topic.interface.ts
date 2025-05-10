export interface ITopicResponse {
  id: number
  title: string
  content: string
  h1: string
  metaTitle: string
  metaDescription: string
  httpStatusCode: number
  userMessage: string | null
  developerMessage: string | null
  errors: unknown[]
  success: boolean
}
