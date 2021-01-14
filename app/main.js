import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <div>{process.env.NODE_ENV}</div>
  </Provider>,
  document.getElementById('app')
)
