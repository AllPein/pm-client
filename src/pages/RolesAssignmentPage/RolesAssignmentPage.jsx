import React, { useEffect, useState, useMemo, useCallback }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as UI from './RolesAssignmentPage.styles'
import { Input } from 'antd'
import { usersSelector } from '@/selectors/users'
import { fetchUsers } from '@/actions/users'
import { Users } from '@/containers/Users'
import debounce from 'lodash.debounce'

const CHANGE_DEBOUNCE_TIME = 350

const RolesAssignmentPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const users = useSelector(usersSelector)

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
    dispatch(fetchUsers(''))
  }, [dispatch])



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
