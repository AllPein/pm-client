import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userInfoSelector } from '@/selectors/user'
import * as UI from './SettingsPage.styles'
import { getAvatarCharacters } from '@/utils/user'
import { Input } from 'antd'

const SettingsPage = () => {
  const dispatch = useDispatch() 
  const userInfo = useSelector(userInfoSelector)
  
  const [firstNameValue, setFirstNameValue] = useState(userInfo?.firstName)
  const [lastNameValue, setLastNameValue] = useState(userInfo?.lastName)
  const [emailValue, setEmailValue] = useState(userInfo?.email)

  const onChangeName = (e) => {
    setFirstNameValue(e.target.value)
  }
  
  const onChangeLastName = (e) => {
    setLastNameValue(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value)
  }

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
      <UI.StyledButton type='primary'>
        Сохранить
      </UI.StyledButton>
    </UI.Wrapper>
  )
}

export {
  SettingsPage
}
