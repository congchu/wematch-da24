import TagManager from 'react-gtm-module'
import { omitBy, isEmpty } from 'lodash'

interface Props {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  CD5?: string;
  CD6?: string;
}

export const dataLayer = ({ event, category, action, label, CD5, CD6 }: Props) => {
  const removeEmpty = omitBy({ event, category, action, label, CD5, CD6 }, isEmpty)

  TagManager.dataLayer({
    dataLayer: {
      ...removeEmpty
    }
  })
}