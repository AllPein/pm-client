import PropTypes from 'prop-types'
import { userShape } from './User'

const participantShape = PropTypes.shape({
  id: PropTypes.number,
  role: PropTypes.string,
  user: userShape
})

const projectShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  participants: PropTypes.arrayOf(participantShape),
  dueDate: PropTypes.string.isRequired,
  repo: PropTypes.string,
  avatar: PropTypes.string
})

export {
  projectShape,
  participantShape
}