

import { SwapOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const SwapIcon = (props) => (
  <SwapOutlined className={props.className} />
)

SwapIcon.propTypes = {
  className: PropTypes.string
}

export {
  SwapIcon
}
