/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc.
 */

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
