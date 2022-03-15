

import { DoubleLeftOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const DoubleLeftIcon = (props) => (
  <DoubleLeftOutlined className={props.className} />
)

DoubleLeftIcon.propTypes = {
  className: PropTypes.string
}

export {
  DoubleLeftIcon
}
