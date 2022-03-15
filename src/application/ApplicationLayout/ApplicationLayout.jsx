import PropTypes from 'prop-types'
import { ApplicationHeader } from '@/components/ApplicationHeader'

const ApplicationLayout = ({ children }) => (
  <>
    <ApplicationHeader />
    {children}
  </>
)

export {
  ApplicationLayout
}

ApplicationLayout.propTypes = {
  children: PropTypes.element.isRequired
}
