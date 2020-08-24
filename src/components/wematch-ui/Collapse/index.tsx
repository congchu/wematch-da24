import * as React from 'react'
export { Collapse } from './Collapse'
export { CollapseHeader } from './CollapseHeader'
export { CollapseItem } from './CollapseItem'
export { CollapsePanel } from './CollapsePanel'


export const CollapseItemContext = React.createContext({
  expanded: false,
  toggleExpansion: () => {} // eslint-disable-line
})
