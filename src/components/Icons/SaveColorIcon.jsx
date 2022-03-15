

import PropTypes from 'prop-types'
import SaveColor from '@/assets/icons/ic-32-save-in-color.svg'

const SaveColorIcon = (props) => (
  <SaveColor className={props.className} />
)

SaveColorIcon.propTypes = {
  className: PropTypes.string
}

export {
  SaveColorIcon
}
