import React from 'react'
import * as UI from './ProjectCard.styles'
import { Avatar } from 'antd'
import { formatDate } from '@/utils/date'
import EmptyImage from '@/assets/icons/empty_image.png'

const ProjectCard = ({
  project,
  openProject
}) => (
  <UI.Wrapper onClick={openProject}>
    <UI.StyledAvatar>
      <Avatar size={128} src={project.avatar || EmptyImage} />
    </UI.StyledAvatar>
    <UI.ProjectInfo>
      <UI.Name>
        {project.name}
      </UI.Name>
      <UI.Description>
        {project.description}
      </UI.Description>
      <UI.Footer>
        <UI.FooterInfo>
          Сдать до: {formatDate(project.dueDate)}
        </UI.FooterInfo>
        <UI.FooterInfo>
          Участников: {project.participants?.length}
        </UI.FooterInfo>   
      </UI.Footer>
    </UI.ProjectInfo>
  </UI.Wrapper>
)


export {
  ProjectCard
}
