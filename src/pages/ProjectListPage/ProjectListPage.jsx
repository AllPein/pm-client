import React from 'react'
import { Search } from '@/containers/Search'
import * as UI from './ProjectListPage.styles'
import { ProjectList } from '@/containers/ProjectList'

const ProjectListPage = () => {
  return (
    <UI.Wrapper>
      <Search />
      <ProjectList />
    </UI.Wrapper>
  )
}

export {
  ProjectListPage
}
