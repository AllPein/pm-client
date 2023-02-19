import { Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { ErrorBoundRoute } from '@/components/ErrorBoundRoute'
import { Spin } from '@/components/Spin'
import { lazy } from '@/utils/lazy'
import { ApplicationLayout } from '@/application/ApplicationLayout'
import { TasksPage } from '../../pages/TasksPage'

const ProjectListPage = lazy(() => import('@/pages/ProjectListPage'), 'ProjectListPage')
const ProjectInfoPage = lazy(() => import('@/pages/ProjectInfoPage'), 'ProjectInfoPage')
const SettingsPage = lazy(() => import('@/pages/SettingsPage'), 'SettingsPage')
const RolesAssignmentPage = lazy(() => import('@/pages/RolesAssignmentPage'), 'RolesAssignmentPage')

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
        <ErrorBoundRoute
          exact
          path='/projects/:projectCode'
        >
          <ProjectInfoPage />
        </ErrorBoundRoute>
        <ErrorBoundRoute
          exact
          path='/projects/:projectCode/tasks'
        >
          <TasksPage />
        </ErrorBoundRoute>
        <ErrorBoundRoute
          exact
          path='/user/settings'
        >
          <SettingsPage />
        </ErrorBoundRoute>
        <ErrorBoundRoute
          exact
          path='/admin/roles'
        >
          <RolesAssignmentPage />
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
