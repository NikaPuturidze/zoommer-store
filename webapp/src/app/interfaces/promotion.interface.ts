export interface IPromotion {
  pageProps: IPageProperties
}

export interface IPageProperties {
  promotions: Promotion[]
}

export interface Promotion {
  id: number
  name: string
  desktopImageUrl: string
  mobileImageUrl: string
  finishDate: string | null
  orderNo: number
  route: string
}
