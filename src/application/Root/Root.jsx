import { Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { ErrorBoundRoute } from '@/components/ErrorBoundRoute'
import { Spin } from '@/components/Spin'
import { lazy } from '@/utils/lazy'
import { ApplicationLayout } from '@/application/ApplicationLayout'

const ProjectListPage = lazy(() => import('@/pages/ProjectListPage'), 'ProjectListPage')

const Root = () => {
  const renderRoot = () => (
    <ApplicationLayout>
      <Switch>
        <Redirect
          exact
          from='/'
          to='/projects'
        />
        <ErrorBoundRoute
          exact
          path='/projects'
        >
          <ProjectListPage />
        </ErrorBoundRoute>
      </Switch>
    </ApplicationLayout>
  )

  return (
    <Suspense fallback={<Spin.Centered spinning />}>
      <ErrorBoundRoute
        path='/' 
        render={renderRoot}
      />
    </Suspense>
  )
}

export {
  Root
}
