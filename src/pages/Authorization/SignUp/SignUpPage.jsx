import React, { useState, useCallback } from 'react'
import { Button, Input } from 'antd'
import * as UI from './SignUpPage.styles'
import { useDispatch } from 'react-redux'
import { signUp } from '@/actions/auth'
import { UserRoles } from '@/enums/Role'
import { goTo } from '@/utils/routerActions'

const SignUpPage = () => {
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [group, setGroup] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleGroupChange = (event) => {
    setGroup(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const register = useCallback(async () => {
    await dispatch(signUp({
      firstName,
      lastName,
      email,
      password: passwordValue,
      group,
      role: UserRoles.STUDENT
    }))
    goTo('/')
  }, [dispatch, email, firstName, group, lastName, passwordValue])


  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <UI.Name>E-mail</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={email}
          onChange={handleEmailChange}
          disabled={false}
        />
        <UI.Name>Имя</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={firstName}
          onChange={handleFirstNameChange}
          disabled={false}
        />
        <UI.Name>Фамилия</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={lastName}
          onChange={handleLastNameChange}
          disabled={false}
        />
        <UI.Name>Группа</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={group}
          onChange={handleGroupChange}
          disabled={false}
        />
        <UI.Name>Пароль</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={passwordValue}
          onChange={handlePasswordChange}
          type='password'
          disabled={false}
        />
        <UI.LinkText>
          Уже есть аккаунт?
          <UI.Link onClick={() => goTo('/signin')}>
            Войти
          </UI.Link>
        </UI.LinkText>
        <UI.ButtonWrapper>
          <Button
            block
            type='primary'
            disabled={false}
            onClick={register}
          >
            Зарегистрироваться
          </Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  )
}

export {
  SignUpPage
}