/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc.
 */

import { Suspense, useCallback } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Root } from '@/application/Root'
import { ErrorBoundRoute } from '@/components/ErrorBoundRoute'
import { Spin } from '@/components/Spin'
import { lazy } from '@/utils/lazy'

const SignUpPage = lazy(() => import('@/pages/Authorization/SignUp'), 'SignUpPage')
const SignInPage = lazy(() => import('@/pages/Authorization/SignIn'), 'SignInPage')

const Auth = () => {
  const renderRoot = useCallback(() => {
    if (true) {
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
