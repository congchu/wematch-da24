import TagManager from 'react-gtm-module'
import { omitBy, isEmpty } from 'lodash'

interface Props {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  CD5?: string;
  CD6?: string;
  CD9?: string;
  CD8?: string;
  CD7?: string;
}

export const dataLayer = ({ event, category, action, label, CD5, CD6, CD7, CD8, CD9 }: Props) => {
  const removeEmpty = omitBy({ event, category, action, label, CD5, CD6, CD7, CD8, CD9 }, isEmpty)

  TagManager.dataLayer({
    dataLayer: {
      ...removeEmpty
    }
  })
}