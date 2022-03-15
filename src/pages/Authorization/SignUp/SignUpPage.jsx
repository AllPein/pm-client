import React, { useState, useCallback, useEffect } from 'react'
import { Button, Input } from 'antd'
import * as UI from './SignUpPage.styles'

const SignUpPage = () => {
  // const dispatch = useDispatch()
  // const loading = useSelector(loadingSelector)
  // const userLoading = useSelector(userLoadingSelector)
  // const error = useSelector(errorSelector)


  // useEffect(() => {
  //   if (!!error) {
  //     openNotification('Ошибка авторизации', 'Неверно введет логин или пароль')
  //   }
  // }, [error])

  const [loginValue, setLoginValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleLoginChange = (event) => {
    setLoginValue(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value)
  }

  // const handleLogin = useCallback(async () => {
  //   await dispatch(login(loginValue, passwordValue))
  // }, [dispatch, loginValue, passwordValue])


  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <UI.Name>E-mail</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={loginValue}
          onChange={handleLoginChange}
          disabled={false}
        />
        <UI.Name>Имя</UI.Name>
        <Input
          placeholder='Заполните поле'
          value={loginValue}
          onChange={handleLoginChange}
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
        <UI.ButtonWrapper>
          <Button
            block
            type='primary'
            disabled={false}
            onClick={() => {}}
          >
            Войти
          </Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  )
}

export {
  SignUpPage
}