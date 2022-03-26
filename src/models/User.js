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
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatarColor: PropTypes.string,
  group: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string
})


export {
  User,
  userShape
}