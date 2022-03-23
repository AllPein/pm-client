import PropTypes from 'prop-types'
import { userShape } from './User'

const projectShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  participants: PropTypes.arrayOf(userShape),
  dueDate: PropTypes.string.isRequired,
  repo: PropTypes.string,
  avatar: PropTypes.string
})

export {
  projectShape
}