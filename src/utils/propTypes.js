import PropTypes from 'prop-types'

const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.element
])

export {
  childrenShape
}