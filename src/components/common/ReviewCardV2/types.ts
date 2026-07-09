export type ReviewCardHeadingLevel = 4 | 5 | 6

export type ReviewCardProps = {
  heading: string
  showEdit?: boolean
  editLabel?: string
  headingLevel?: ReviewCardHeadingLevel
}
