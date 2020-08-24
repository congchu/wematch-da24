import React from 'react'
import ReactDOM from 'react-dom'
import { CONAINER_CLASSNAME } from './'

const ToastPortal: React.FC = ({ children }) => {
  let container = document.querySelector(`.${CONAINER_CLASSNAME}`)

  if (!container) {
    const containerDiv = document.createElement('div')
    containerDiv.className = CONAINER_CLASSNAME
    container = containerDiv

    document.body.appendChild(container)
  }
  return ReactDOM.createPortal(children, container)
}

export default ToastPortal
