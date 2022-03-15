import React from 'react'
import { Project } from '@/components/Project'
import * as UI from './ProjectList.styles'

const ProjectList = () => {
  return (
    <UI.Wrapper>
      {['Создание ИС для завода', 'Создание ИС для фабрики', 'Создание ИС для твари'].map((p) => (
        <Project 
          key={p}
          name={p}
        />
      ))}
    </UI.Wrapper>
  )
}

export {
  ProjectList
}
