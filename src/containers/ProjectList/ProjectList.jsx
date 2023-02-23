import React, { useCallback } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import * as UI from './ProjectList.styles'
import { goTo } from '@/utils/routerActions'

const ProjectList = ({
  projects
}) => {
  const openProject = useCallback((project) => {
    goTo(`/projects/${project.id}`)
  }, [])


  return (
    <UI.Wrapper>
      {projects.map((p) => (
        <ProjectCard 
          key={p.code + p.name}
          project={p}
          openProject={() => openProject(p)}
        />
      ))}
    </UI.Wrapper>
  )
}

export {
  ProjectList
}
