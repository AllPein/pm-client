import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const ErrorBoundRoute = ({ exact, children, path, render }) => (
  <ErrorBoundary>
    <Route
      exact={exact}
      path={path}
      render={render}
    >
      {children}
    </Route>
  </ErrorBoundary>
)

ErrorBoundRoute.propTypes = {
  children: PropTypes.element,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  render: PropTypes.func
}

export { ErrorBoundRoute }
