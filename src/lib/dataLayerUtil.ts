import TagManager from 'react-gtm-module'

interface Props {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  CD9?: string;
  CD8?: string;
  CD7?: string;
}

export const dataLayer = ({ event, category, action, label, CD7, CD8, CD9 }: Props) => {
  TagManager.dataLayer({
    dataLayer: {
      event, category, action, label, CD7, CD8, CD9
    }
  })
}