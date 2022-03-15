import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Provider } from '@/application/Provider'
import { Auth } from '@/application/Auth'
import { GlobalStyles } from '@/application/GlobalStyles'

ReactDOM.render(
  (
    <Provider>
      <GlobalStyles />
      <Auth />
    </Provider>
  ),
  document.getElementById('root')
);


