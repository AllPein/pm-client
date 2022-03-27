import React, { useEffect, useState, useMemo, useCallback }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as UI from './RolesAssignmentPage.styles'
import { Input } from 'antd'
import { usersSelector } from '@/selectors/users'
import { fetchUsers } from '@/actions/users'
import { Users } from '@/containers/Users'
import debounce from 'lodash.debounce'
import { userInfoSelector } from '@/selectors/user'
import { goBack } from '@/utils/routerActions'
import { UserRoles } from '@/enums/Role'

const CHANGE_DEBOUNCE_TIME = 350

const RolesAssignmentPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const users = useSelector(usersSelector)
  const user = useSelector(userInfoSelector)

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

  const onChange = useCallback(
    (e) => {
      const value = e.target.value
      setSearchValue(value)
      debouncedSetValue(value)
    },
    [debouncedSetValue, setSearchValue]
  )

  useEffect(() => {
    if (user.role !== UserRoles.ADMIN) {
      goBack()
    }
    dispatch(fetchUsers(''))
  }, [dispatch, user.role])



  return (
    <UI.Wrapper>
      <Input
        allowClear
        onChange={onChange}
        value={searchValue}
        placeholder='Найти'
        suffix={
          (
            <UI.StyledSearchIcon />
          )
        }
      />
      <Users users={users} />
    </UI.Wrapper>
  )
}

export {
  RolesAssignmentPage
}
