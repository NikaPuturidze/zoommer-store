export interface IMegaMenu {
  id: number
  name: string
  url: string
  categoryId?: number
  parentItemId?: number
  order: number
  isActive: boolean
  isExpanded: boolean
  isNew: boolean
  forMain: boolean
  iconId?: number
  iconUrl?: string
  imageId?: number
  imageUrl?: string
  description?: string
  childItems?: IMegaMenu[]
}
