import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as UI from './ProjectInfo.styles'
import { Avatar, Input, Tooltip } from 'antd'
import { projectShape } from '@/models/Project'
import { UserRoles } from '@/enums/Role'
import { Button } from 'antd/lib/radio'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { formatDate } from '@/utils/date'

const ProjectInfo = ({
  project,
  userRole
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [repoValue, setRepoValue] = useState(project.repo)

  const onInputBlur = useCallback(() => {
    setIsEditing(false)
    setRepoValue(project.repo)
  }, [setIsEditing, project])

  const onEdit = useCallback(() => {
    setIsEditing(true)
  }, [setIsEditing])

  const onInputChange = useCallback((e) => {
    setRepoValue(e.target.value)
  }, [setRepoValue])

  const renderEditTooltip = useMemo(() => {
    if (isEditing) {
      return (
        <Tooltip title='Сохранить'>
          <Button>
            <CheckOutlined />
          </Button>
        </Tooltip>
      )
    }

    return (
      <Tooltip title='Изменить'>
        <Button onClick={onEdit}>
          <EditOutlined />
        </Button>
      </Tooltip>
    )
  }, [isEditing, onEdit])

  const renderRepoLink = useMemo(() => {
    if (userRole === UserRoles.PROJECT_MANAGER) {
      return (
        <UI.StyledInput compact >
          <Input
            style={{ width: 'calc(100% - 10rem)' }}
            value={repoValue}
            disabled={!isEditing}
            onBlur={onInputBlur}
            onChange={onInputChange}
          />
          {renderEditTooltip}
        </UI.StyledInput>
      )
    }
    return (
      <UI.RepoName>
        {repoValue}
      </UI.RepoName>
    )
  }, [isEditing, onInputBlur, onInputChange, renderEditTooltip, repoValue, userRole])

  return (
    <UI.Wrapper>
      <UI.Controls>
        <UI.StyledAvatar>
          <Avatar size={128} src={project.avatar} />
        </UI.StyledAvatar>
        <UI.Name>
          {project.name}
        </UI.Name>
      </UI.Controls>
      <UI.DescriptionName>
        Описание проекта
      </UI.DescriptionName>
      <UI.Description>
        {project.description}
      </UI.Description>
      <UI.InfoControls>
        Дата сдачи: {formatDate(project.dueDate)}
      </UI.InfoControls>
      <UI.RepoHandler>
        <UI.InfoControls>
          Репозиторий: 
        </UI.InfoControls>
        {renderRepoLink}
      </UI.RepoHandler>
    </UI.Wrapper>
  )
}

ProjectInfo.propTypes = {
  project: projectShape.isRequired,
  userRole: PropTypes.string.isRequired
} 

export {
  ProjectInfo
}
