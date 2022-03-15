

import PropTypes from 'prop-types'
import Delete from '@/assets/icons/ic-32-delete.svg'
import { Icon } from './Icons.styles'

const DeleteIcon = (props) => (
  <Icon>
    <Delete className={props.className} />
  </Icon>
)

DeleteIcon.propTypes = {
  className: PropTypes.string
}

export {
  DeleteIcon
}
