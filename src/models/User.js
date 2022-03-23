import PropTypes from 'prop-types'

class User {
  constructor (
    email,
    firstName,
    lastName,
    group,
    role,
    id,
    avatarColor
  ) {
    this.id = id
    this.group = group
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.role = role
    this.avatarColor = avatarColor
  }
}

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatarColor: PropTypes.string.isRequired,
  group: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string.isRequired
})


export {
  User,
  userShape
}