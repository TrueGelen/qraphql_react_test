/* libs */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
/* styles */
import '../node_modules/normalize.css/normalize.css'
import commonStyles from './scss/main.module.scss'
/* components */
import App from './js/app'
/* other */
import store from './js/Redux/store'

ReactDom.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#app')
)