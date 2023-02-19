import React, { useState, useMemo } from 'react'
import * as UI from './ProjectInfo.styles'
import { Avatar, Input, Tooltip, Button } from 'antd'
import { projectShape } from '@/models/Project'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useCallback } from 'react'
import { formatDate } from '@/utils/date'
import { ProjectRoles } from '@/enums/Role'
import { notifySuccess } from '@/utils/notification/notification'
import { goTo } from '@/utils/routerActions'
import { history } from '@/utils/history'

const ProjectInfo = ({
  project,
  user,
  onRepoSave
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [repoValue, setRepoValue] = useState(project.repo)

  const onEdit = useCallback(() => {
    setIsEditing(true)
  }, [setIsEditing])

  const onInputChange = useCallback((e) => {
    setRepoValue(e.target.value)
  }, [setRepoValue])

  const onSaveRepo = useCallback((e) => {
    e.preventDefault()
    setIsEditing(false)
    onRepoSave(repoValue)
    notifySuccess('Успешно', 'Репозиторий изменен')
  }, [onRepoSave, repoValue])

  const renderEditTooltip = useMemo(() => {
    if (isEditing) {
      return (
        <Tooltip title='Сохранить'>
          <Button onClick={onSaveRepo}>
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
  }, [isEditing, onEdit, onSaveRepo])

  const renderRepoLink = useMemo(() => {
    if (user.projectRole === ProjectRoles.TEAM_LEAD || user.projectRole === ProjectRoles.OWNER) {
      return (
        <UI.StyledInput compact >
          <Input
            style={{ width: 'calc(100% - 10rem)' }}
            value={repoValue}
            disabled={!isEditing}
            onChange={onInputChange}
          />
          {renderEditTooltip}
        </UI.StyledInput>
      )
    }
    return (
      <UI.RepoName>
        {repoValue ?? 'Привяжите репозиторий'}
      </UI.RepoName>
    )
  }, [isEditing, onInputChange, renderEditTooltip, repoValue, user.projectRole])

  const handleRedirectToTasks = useCallback(() => {
    goTo(history.location.pathname + '/tasks')
  }, [])

  return (
    <UI.Wrapper>
      <UI.Controls>
        <UI.NameControl>
          <UI.StyledAvatar>
            <Avatar size={128} src={project.avatar} />
          </UI.StyledAvatar>
          <UI.Name>
            {project.name}
          </UI.Name>
        </UI.NameControl>
        <UI.RightControls>
          <UI.InfoControls>
            Дата сдачи: {formatDate(project.dueDate)}
          </UI.InfoControls>
          <UI.RepoHandler>
            <UI.InfoControls>
              Репозиторий: 
            </UI.InfoControls>
            {renderRepoLink}
          </UI.RepoHandler>
          <UI.StyledButton 
            type='primary' 
            onClick={handleRedirectToTasks}
          >
            Перейти к задачам
          </UI.StyledButton>
        </UI.RightControls>
      </UI.Controls>
      <UI.DescriptionName>
        Описание проекта
      </UI.DescriptionName>
      <UI.Description>
        {project.description}
      </UI.Description>
      
    </UI.Wrapper>
  )
}

ProjectInfo.propTypes = {
  project: projectShape.isRequired,
} 

export {
  ProjectInfo
}
