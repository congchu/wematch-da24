import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './Toast'
import { Props } from './types'

export const CONAINER_CLASSNAME = 'ashUi-toastContainer'

export const createToast = (config: Props) => {
  const toastElement = document.createElement('div')
  toastElement.className = 'ashUi-toast'
  ReactDOM.render(<Toast {...config} />, toastElement)
}
