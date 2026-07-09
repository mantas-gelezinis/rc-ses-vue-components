export type SubcardHeadingLevel = 3 | 4 | 5 | 6

export type SubcardProps = {
  heading: string
  showDescription?: boolean
  description?: string
  showFooter?: boolean
  headingLevel?: SubcardHeadingLevel
}
