import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './App'
import TagManager from 'react-gtm-module'
import ReactPixel from 'react-facebook-pixel'
import { init as initSentry } from 'lib/sentry'

// Sentry Init da24-user-web-**
if (process.env.NODE_ENV !== 'development') {
  initSentry()
}

//GTM init
TagManager.initialize({
    gtmId: 'GTM-N2SBGT7'
})

// Facebook init
ReactPixel.init('1412857602168220')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
