import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userInfoSelector } from '@/selectors/user'
import * as UI from './SettingsPage.styles'
import { getAvatarCharacters } from '@/utils/user'
import { Input } from 'antd'
import { useCallback } from 'react'
import { setUserInfo, updateUser } from '@/actions/user'
import { goBack } from '@/utils/routerActions'
import { notifySuccess } from '@/utils/notification/notification'

const SettingsPage = () => {
  const dispatch = useDispatch() 
  const userInfo = useSelector(userInfoSelector)
  
  const [firstNameValue, setFirstNameValue] = useState(userInfo?.firstName)
  const [lastNameValue, setLastNameValue] = useState(userInfo?.lastName)
  const [emailValue, setEmailValue] = useState(userInfo?.email)
  const [ghUsername, setGhUsername] = useState(userInfo?.ghUsername)
  const [group, setGroup] = useState(userInfo?.group)

  const onChangeName = (e) => {
    setFirstNameValue(e.target.value)
  }
  
  const onChangeLastName = (e) => {
    setLastNameValue(e.target.value)
  }

  const onChangeGroup = (e) => {
    setGroup(e.target.value)
  }

  const onChangeGithub = (e) => {
    setGhUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value)
  }

  const onSave = useCallback(async () => {
    const updatedUser = await dispatch(updateUser({
      ...userInfo,
      group,
      ghUsername,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue
    }))
    await dispatch(setUserInfo(updatedUser))
    notifySuccess('Успешно', 'Данные успешно сохранены!')
  }, [dispatch, emailValue, firstNameValue, ghUsername, group, lastNameValue, userInfo])

  const back = useCallback(() => {
    goBack()
  }, [])

  return (
    <UI.Wrapper>
      <UI.StyledAvatar color={userInfo?.avatarColor}>
        {getAvatarCharacters(userInfo)}
      </UI.StyledAvatar>
      <UI.FieldName>
        Имя
      </UI.FieldName>
      <Input
        value={firstNameValue}
        onChange={onChangeName}
      />
      <UI.FieldName>
        Фамилия
      </UI.FieldName>
      <Input
        value={lastNameValue}
        onChange={onChangeLastName}
      />
      <UI.FieldName>
        E-mail
      </UI.FieldName>
      <Input
        value={emailValue}
        onChange={onChangeEmail}
      />
      <UI.FieldName>
        Имя пользователя GitHub
      </UI.FieldName>
      <Input
        value={ghUsername}
        onChange={onChangeGithub}
      />
      <UI.FieldName>
        Группа
      </UI.FieldName>
      <Input
        value={group}
        onChange={onChangeGroup}
      />
      <UI.ButtonControls>
        <UI.StyledButton
          type='primary'
          onClick={onSave}
        >
          Сохранить
        </UI.StyledButton>
        <UI.StyledButtonBack
          onClick={back}
        >
          Назад
        </UI.StyledButtonBack>
      </UI.ButtonControls>
      
    </UI.Wrapper>
  )
}

export {
  SettingsPage
}
