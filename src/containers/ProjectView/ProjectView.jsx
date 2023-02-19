import React, { useMemo, useState } from 'react'
import * as UI from './ProjectView.styles'
import { ProjectInfo } from '@/components/ProjectInfo'
import { useDispatch, useSelector } from 'react-redux'
import { activeTabSelector } from '@/selectors/projectView'
import { Tabs, Tab } from '@/components/Tabs'
import { useCallback } from 'react'
import { changeActiveTab } from '@/actions/projectView'
import { Empty, Modal, Input, Divider, Button } from 'antd'
import { ProjectParticipants } from '@/components/ProjectParticipants'
import { usersSelector } from '@/selectors/users'
import { UserCard } from '@/components/UserCard/UserCard'
import { UserRoles } from '@/enums/Role'
import { updateProject } from '@/actions/projectView'
import { addParticipant, updateParticipant } from '@/actions/projectView/projectView'
import { ProjectRoles } from '@/enums/Role'
import { useEffect } from 'react'
import { fetchUsers } from '@/actions/users/users'
import debounce from 'lodash.debounce'
import { ProjectMetrics } from '@/containers/ProjectMetrics'
import { ProjectReport } from '@/containers/ProjectReport'
import { notifySuccess } from '@/utils/notification/notification'

const CHANGE_DEBOUNCE_TIME = 350

const ProjectView = ({
  project,
  userInfo
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const activeTab = useSelector(activeTabSelector)
  const users = useSelector(usersSelector)

  useEffect(() => {
    dispatch(fetchUsers(''))
  }, [dispatch])

  const debouncedSetValue = useMemo(
    () => debounce(
      (value) => {
        dispatch(
          fetchUsers(value)
        )
      },
      CHANGE_DEBOUNCE_TIME
    ),
    [dispatch]
  )

  const onSearchChange = useCallback(
    (e) => {
      const value = e.target.value
      setSearchValue(value)
      debouncedSetValue(value)
    },
    [debouncedSetValue]
  )

  const toggleModal = useCallback((state) => {
    setIsModalVisible(state)
  }, [setIsModalVisible])

  const onOpenModalClick = useCallback(() => {
    toggleModal(true)
  }, [toggleModal])

  const onAssignTeamLead = useCallback((participant) => {
    dispatch(updateParticipant({
      projectId: project.id,
      id: participant.id,
      role: ProjectRoles.TEAM_LEAD
    }))
  }, [dispatch, project.id])

  const getTabs = useMemo(() =>{
    const tabs = [
      new Tab(
        'participants',
        'Участники',
        () => (
          <ProjectParticipants
            userInfo={userInfo}
            onAddButtonClick={onOpenModalClick}
            onAssignTeamLead={onAssignTeamLead}
            participants={project.participants}
          />
        )
      ),
      new Tab(
        'timeReport',
        'Работа Участников',
        () => (
          <ProjectMetrics
            project={project}
          />
        )
      ),
      new Tab(
        'projectReport',
        'Отчет',
        () => (
          <ProjectReport
            user={userInfo}
            project={project}
          />
        )
      )
    ]
    
    return tabs
  }, [onAssignTeamLead, onOpenModalClick, project, userInfo])

  const onTabChange = useCallback((tab) => {
    dispatch(changeActiveTab(tab))
  }, [dispatch])

  const onAddParticipant = useCallback(async (user) => {
    await dispatch(addParticipant({
        userId: user.id,
        role: ProjectRoles.PARTICIPANT,
        projectId: project.id
      })
    )
    notifySuccess('Успешно', 'Участник добавлен на проект')
  }, [dispatch, project.id])

  const renderAddButton = useCallback((user) => {
    if (user.role !== UserRoles.STUDENT || project.participants.find((p) => p.userId === user.id)) {
      return null
    }

    return (
      <Button
        type='primary'
        onClick={() => onAddParticipant(user)}
      >
        Добавить
      </Button>
    )
  }, [onAddParticipant, project.participants])

  const onRepoSave = useCallback(async (repo) => {
    await dispatch(updateProject({
      code: project.code,
      id: project.id,
      repo
    }))

  }, [dispatch, project])

  const renderModalContent = useMemo(() => (
    <>
      <Input
        allowClear
        value={searchValue}
        onChange={onSearchChange}
        placeholder='Найти'
        suffix={
          (
            <UI.StyledSearchIcon />
          )
        }
      />
      <UI.UsersWrapper>
      {
        users.length ? (
          users.map((user) => (
            <div key={user.id}>
              <UserCard
                user={user}
                rightControls={renderAddButton.bind(null, user)()}
              />
              <Divider />
            </div>
          ))
        ) : (
          <Empty />
        )
      }
      </UI.UsersWrapper>
    </>
  ), [onSearchChange, renderAddButton, searchValue, users])


  return (
    <>
      { project ? (
        <UI.Wrapper>
          <ProjectInfo
            onRepoSave={onRepoSave}
            project={project}
            user={userInfo}
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
      <Modal
        open={isModalVisible}
        width='100rem'
        title='Добавить участника'
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
      >
        {renderModalContent}
      </Modal>
    </>
  )
}

export {
  ProjectView
}
