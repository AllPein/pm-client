import React, { useState, useCallback } from 'react'
import { Button, Input } from 'antd'
import * as UI from './SignInPage.styles'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '@/actions/auth'
import { goTo } from '@/utils/routerActions'
import { isFetchingSelector } from '@/selectors/requests'

const SignInPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector(signIn))

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  const handleLogin = useCallback(async () => {
    await dispatch(signIn({
      email: emailValue,
      password: passwordValue
    }))
    goTo('/')
  }, [dispatch, emailValue, passwordValue])


  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <UI.Name>E-mail</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={emailValue}
          onChange={handleEmailChange}
          disabled={isFetching}
        />
        <UI.Name>Пароль</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={passwordValue}
          onChange={handlePasswordChange}
          type='password'
          disabled={isFetching}
        />
        <UI.LinkText>
          Нет аккаунта?
          <UI.Link onClick={() => goTo('/signup')}>
            Создайте
          </UI.Link>
        </UI.LinkText>
        <UI.ButtonWrapper>
          <Button
            block
            type='primary'
            disabled={isFetching}
            onClick={handleLogin}
          >
            Войти
          </Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  )
}

export {
  SignInPage
}