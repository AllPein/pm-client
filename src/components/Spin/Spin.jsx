import AntdSpin from 'antd/es/spin'
import 'antd/lib/spin/style/index.less'
import PropTypes from 'prop-types'
import { childrenShape } from '@/utils/propTypes'

const Spin = ({ children, spinning = false }) => (
  <AntdSpin spinning={spinning}>
    {children}
  </AntdSpin>
)

Spin.propTypes = {
  children: childrenShape,
  spinning: PropTypes.bool
}

export {
  Spin
}
