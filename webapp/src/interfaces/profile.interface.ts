export interface IProfile {
  id: number
  lastName: string | null
  name: string | null
  phone: string
  imageUrl: string
  isSubscribed: boolean
  citizenOfAnotherCountry: boolean
  city: string | null
  country: string | null
  developerMessage: string | null
  email: string
  errors: string[]
  httpStatusCode: number
  language: number
  personalNumber: string | null
  promoCode: string | null
  state: string | null
  success: boolean
  userMessage: string | null
  zip: string | null
}
