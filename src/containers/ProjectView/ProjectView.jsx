import React, { useMemo } from 'react'
import * as UI from './ProjectView.styles'
import { ProjectInfo } from '@/components/ProjectInfo'
import { useDispatch, useSelector } from 'react-redux'
import { activeTabSelector } from '@/selectors/projectView'
import { Tabs, Tab } from '@/components/Tabs'
import { useCallback } from 'react'
import { changeActiveTab } from '@/actions/projectView'
import { Empty } from 'antd'
import { ProjectParticipants } from '@/components/ProjectParticipants'

const ProjectView = ({
  project,
  userInfo
}) => {
  const dispatch = useDispatch()

  const activeTab = useSelector(activeTabSelector)

  const getTabs = useMemo(() =>{
    const tabs = [
      new Tab(
        'participants',
        'Участники',
        () => <ProjectParticipants participants={project.participants} />
      ),
      new Tab(
        'timeReport',
        'Работа Участников',
        () => (<>Работа Участников</>)
      ),
      new Tab(
        'projectReport',
        'Отчет',
        () => (<>Отчет</>)
      )
    ]
    
    return tabs
  }, [project])

  const onTabChange = useCallback((tab) => {
    dispatch(changeActiveTab(tab))
  }, [dispatch])

  return (
    <>
      { project ? (
        <UI.Wrapper>
          <ProjectInfo
            project={project}
            userRole={userInfo?.role}
          />
          <Tabs
            activeKey={activeTab ?? getTabs()[0].key}
            onChange={onTabChange}
            tabs={getTabs}
          />
        </UI.Wrapper>
      ) : (
        <Empty />
      )}
    </>
  )
}

export {
  ProjectView
}
