import PropTypes from 'prop-types'
import AddLabel from '@/assets/icons/ic-32-add-label.svg'
import { Icon } from './Icons.styles'

const AddLabelIcon = (props) => (
  <Icon>
    <AddLabel className={props.className} />
  </Icon>
)

AddLabelIcon.propTypes = {
  className: PropTypes.string
}

export {
  AddLabelIcon
}
