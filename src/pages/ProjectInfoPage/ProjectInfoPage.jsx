import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import * as UI from './ProjectInfoPage.styles'
import { useEffect } from 'react'
import { fetchProject } from '@/actions/projectView'
import { ProjectView } from '@/containers/ProjectView'
import { BackLink } from '@/components/BackLink'
import { fetchProjectUserData } from '@/actions/user'
import { userInfoSelector } from '@/selectors/user'
import { projectSelector } from '@/selectors/projectView'


const ProjectInfoPage = () => {
  const { projectCode } = useParams()
  const dispatch = useDispatch() 
  const user = useSelector(userInfoSelector)
  const project = useSelector(projectSelector)


  useEffect(() => {
    if (projectCode) {
      dispatch(fetchProject(projectCode))
      // dispatch(fetchProjectUserData(projectCode, user.id))
    }
  }, [dispatch, projectCode, user.id])

  return (
    <UI.Wrapper>
      <BackLink anchor='Все проекты' />
      <ProjectView
        project={project}
        userInfo={user}
      />
    </UI.Wrapper>
  )
}

export {
  ProjectInfoPage
}
