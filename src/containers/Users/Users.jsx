import React, { useCallback, useMemo, useState } from 'react'
import * as UI from './Users.styles'
import { userShape } from '@/models/User'
import PropTypes from 'prop-types'
import { Empty } from '@/components/Empty'
import { Divider, Modal, Radio } from 'antd'
import { getUserCaption } from '@/utils/user'
import { UserCard } from '@/components/UserCard'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserRoles, UserRolesName } from '@/enums/Role'
import { updateUser } from '@/actions/user'
import { fetchUsers } from '@/actions/users'
import { isFetchingSelector } from '@/selectors/requests'
import { Spin } from '@/components/Spin'
import { notifySuccess } from '../../utils/notification/notification'

const Users = ({
  users
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [currentUserRole, setCurrentUserRole] = useState(null)

  const dispatch = useDispatch()

  const isFetching = useSelector(isFetchingSelector(fetchUsers))

  const toggleModal = useCallback((state) => {
    setIsModalVisible(state)
  }, [setIsModalVisible])

  const RolesConfig = useMemo(() => [
    {
      role: UserRoles.STUDENT,
      check: () => setCurrentUserRole(UserRoles.STUDENT)
    },
    {
      role: UserRoles.PROJECT_MANAGER,
      check: () => setCurrentUserRole(UserRoles.PROJECT_MANAGER)
    },
    {
      role: UserRoles.ADMIN,
      check: () => setCurrentUserRole(UserRoles.ADMIN)
    }
  ], [setCurrentUserRole])

  const onModalOk = useCallback(async () => {
    await dispatch(updateUser({
      ...currentUser,
      role: currentUserRole
    }))
    await dispatch(fetchUsers(''))
    notifySuccess('Успешно', 'Роль успешно назначена!')
    toggleModal(false)
  }, [currentUser, currentUserRole, dispatch, toggleModal])

  const onOpenModalClick = useCallback((user) => {
    setCurrentUser(user)
    setCurrentUserRole(user.role)
    toggleModal(true)
  }, [toggleModal])

  const renderAssignButton = (user) => {
    if (user.role === UserRoles.ADMIN) {
      return null
    }

    return (
      <Button
        type='primary'
        onClick={() => onOpenModalClick(user)}
      >
        Назначить
      </Button>
    )
  }

  const renderModalContent = useMemo(() => (
    <>
      <UI.FullNameBlock>
        {getUserCaption(currentUser)}
      </UI.FullNameBlock>
      <UI.Roles>
        {
          RolesConfig.map((item) => (
            <UI.RoleWrapper key={item.role}>
              {UserRolesName[item.role]}
              <Radio 
                checked={item.role === currentUserRole}
                onChange={item.check}
              />
            </UI.RoleWrapper>
          ))
        }
      </UI.Roles>
    </>
  ), [RolesConfig, currentUser, currentUserRole])

  return (
    <UI.Wrapper>
      {isFetching && <Spin.Centered />}
      {
        users.length ? (
          users.map((user) => (
            <div key={user.id}>
              <UserCard
                user={user}
                rightControls={renderAssignButton.bind(null, user)()}
              />
              <Divider />
            </div>
          ))
        ) : (
          <Empty />
        )
      }
      <Modal
        visible={isModalVisible}
        title='Назначить роль'
        onOk={onModalOk}
        onCancel={() => toggleModal(false)}
      >
        {renderModalContent}
      </Modal>
    </UI.Wrapper>
  )
}

Users.propTypes = {
  users: PropTypes.arrayOf(userShape).isRequired
} 

export {
  Users
}
