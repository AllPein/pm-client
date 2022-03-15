import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    localBoundary: PropTypes.func
  }

  state = {
    pathname: '',
    hasError: false
  }

  static getDerivedStateFromError = () => ({
    hasError: true,
    pathname: window.location.pathname
  })

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (prevState.hasError && window.location.pathname !== prevState.pathname) {
      return {
        hasError: false,
        pathname: ''
      }
    }
    return null
  }

  componentDidCatch = (error, errorInfo) => {
    console.error('ErrorBoundary: Error', error)
    console.error('ErrorBoundary: Error Info', errorInfo.componentStack)
  }

  render = () => {
    if (this.state.hasError) {
      return (this.props.localBoundary?.() ?? <h1>Something went wrong.</h1>)
    }

    return this.props.children
  }
}

export {
  ErrorBoundary
}
