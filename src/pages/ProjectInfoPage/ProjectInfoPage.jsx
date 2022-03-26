import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import * as UI from './ProjectInfoPage.styles'
import { useEffect } from 'react'
import { fetchProject } from '@/actions/projectView'
import { ProjectView } from '@/containers/ProjectView'
import { BackLink } from '@/components/BackLink'
import { userInfoSelector } from '@/selectors/user'
import { projectSelector } from '@/selectors/projectView'
import { useMemo } from 'react'


const ProjectInfoPage = () => {
  const { projectCode } = useParams()
  const dispatch = useDispatch() 
  const user = useSelector(userInfoSelector)
  const project = useSelector(projectSelector)


  useEffect(() => {
    if (projectCode) {
      dispatch(fetchProject(projectCode))
    }
  }, [dispatch, projectCode, user.id])

  const userInfo = useMemo(() => {
    if (!project || !user) {
      return
    }

    return {
      ...user,
      projectRole: project.participants.find((p) => p.userId === user.id)?.role
    }
  }, [project, user])

  return (
    <UI.Wrapper>
      <BackLink anchor='Все проекты' />
      {
        project && user && (
          <ProjectView
            project={project}
            userInfo={userInfo}
          />
        )
      }
      
    </UI.Wrapper>
  )
}

export {
  ProjectInfoPage
}
