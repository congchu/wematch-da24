import TagManager from 'react-gtm-module'

interface Props {
  event: string;
  category?: string;
  action?: string;
  label?: string;
}

export const dataLayer = ({ event, category, action, label }: Props) => {
  TagManager.dataLayer({
    dataLayer: {
      event, category, action, label
    }
  })
}