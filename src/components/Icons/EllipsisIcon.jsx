

import PropTypes from 'prop-types'
import Ellipsis from '@/assets/icons/ellipsis.svg'

const EllipsisIcon = (props) => (
  <Ellipsis className={props.className} />
)

EllipsisIcon.propTypes = {
  className: PropTypes.string
}

export {
  EllipsisIcon
}
