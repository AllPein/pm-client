import React from 'react'
import 'antd/lib/style/themes/default.less'
import 'antd/lib/style/core/index.less'
import ReactDOM from 'react-dom'
import './index.css'

import { Provider } from '@/application/Provider'
import { Auth } from '@/application/Auth'

ReactDOM.render(
  (
    <Provider>
      <Auth />
    </Provider>
  ),
  document.getElementById('root')
);


