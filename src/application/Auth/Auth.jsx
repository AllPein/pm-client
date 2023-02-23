import { Suspense, useCallback } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Root } from '@/application/Root'
import { ErrorBoundRoute } from '@/components/ErrorBoundRoute'
import { Spin } from '@/components/Spin'
import { lazy } from '@/utils/lazy'
import { authProvider } from './authProvider'

const SignUpPage = lazy(() => import('@/pages/Authorization/SignUp'), 'SignUpPage')
const SignInPage = lazy(() => import('@/pages/Authorization/SignIn'), 'SignInPage')

const Auth = () => {
  const renderRoot = useCallback(() => {
    if (!authProvider.isAuthenticated()) {
      return (
        <Redirect to={
          {
            pathname: '/signin',
            state: window.location.href
          }
        } 
        />
      )
    }
    return (
      <Root />
    )
  }, [])

  return (
    <Suspense fallback={<Spin.Centered spinning />}>
      <Switch>
        <ErrorBoundRoute
          exact
          path='/signin'
        >
          <SignInPage />
        </ErrorBoundRoute>
        <ErrorBoundRoute
          exact
          path='/signup'
        >
          <SignUpPage />
        </ErrorBoundRoute>
        <ErrorBoundRoute
          path='/'
          render={renderRoot}
        />
      </Switch>
    </Suspense>
  )
}

export {
  Auth
}
