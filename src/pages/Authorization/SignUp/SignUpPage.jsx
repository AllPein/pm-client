import React, { useState, useCallback } from "react";
import { Button, Input } from "antd";
import * as UI from "./SignUpPage.styles";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/actions/auth";
import { UserRoles } from "@/enums/Role";
import { goTo } from "@/utils/routerActions";
import { isFetchingSelector } from "@/selectors/requests";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(isFetchingSelector(signUp));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [ghUsername, setGhUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGhUsernameChange = (event) => {
    setGhUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const register = useCallback(async () => {
    await dispatch(
      signUp({
        firstName,
        lastName,
        email,
        username,
        ghUsername,
        password: passwordValue,
        group,
        role: UserRoles.STUDENT,
      })
    );
    goTo("/");
  }, [
    dispatch,
    email,
    firstName,
    ghUsername,
    group,
    lastName,
    passwordValue,
    username,
  ]);

  return (
    <UI.Wrapper>
      <UI.FormLogin>
        <UI.Name>E-mail</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={email}
          name="email"
          onChange={handleEmailChange}
          disabled={isFetching}
        />
        <UI.Name>Username</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={username}
          name="username"
          onChange={handleUsernameChange}
          disabled={isFetching}
        />
        <UI.Name>Имя</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={firstName}
          name="name"
          onChange={handleFirstNameChange}
          disabled={isFetching}
        />
        <UI.Name>Фамилия</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={lastName}
          name="surname"
          onChange={handleLastNameChange}
          disabled={isFetching}
        />
        <UI.Name>Группа</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={group}
          onChange={handleGroupChange}
          disabled={isFetching}
        />
        <UI.Name>Имя пользователя на GitHub</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={ghUsername}
          name="username"
          onChange={handleGhUsernameChange}
          disabled={isFetching}
        />
        <UI.Name>Пароль</UI.Name>
        <Input
          placeholder="Заполните поле"
          value={passwordValue}
          onChange={handlePasswordChange}
          type="password"
          disabled={isFetching}
        />
        <UI.LinkText>
          Уже есть аккаунт?
          <UI.Link onClick={() => goTo("/signin")}>Войти</UI.Link>
        </UI.LinkText>
        <UI.ButtonWrapper>
          <Button block type="primary" disabled={isFetching} onClick={register}>
            Зарегистрироваться
          </Button>
        </UI.ButtonWrapper>
      </UI.FormLogin>
    </UI.Wrapper>
  );
};

export { SignUpPage };
