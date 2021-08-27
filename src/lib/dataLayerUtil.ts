import TagManager from 'react-gtm-module'
import { omitBy, isEmpty } from 'lodash'

interface Props {
  event: string
  category?: string
  action?: string
  label?: string
  CD5?: string
  CD6?: string
  CD7?: string
  CD8?: string
  CD9?: string
  CD10?: string
  CD11?: string
  CD12?: string
  CD13?: string
  CD14?: string
  CD15?: string
  CD16?: string
  CD17?: string
  CD18?: string
  CD19?: string
  CD20?: string
}

export const dataLayer = ({ event, category, action, label, CD5, CD6, CD7, CD8, CD9, CD10, CD12, CD16, CD17, CD18, CD19 }: Props) => {
  const removeEmpty = omitBy({ event, category, action, label, CD5, CD6, CD7, CD8, CD9, CD10, CD12, CD16, CD17, CD18, CD19 }, isEmpty)

  TagManager.dataLayer({
    dataLayer: {
      ...removeEmpty
    }
  })
}
