

import { DoubleRightOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const DoubleRightIcon = (props) => (
  <DoubleRightOutlined className={props.className} />
)

DoubleRightIcon.propTypes = {
  className: PropTypes.string
}

export {
  DoubleRightIcon
}
