import { forwardRef } from 'react'
import { Empty as AntdEmpty } from 'antd'

const Empty = forwardRef((props, ref) => (
  <div ref={ref}>
    <AntdEmpty {...props} />
  </div>
))

export {
  Empty
}
