/* lib */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';

/* components */
import PageLayout from '../../components/pageLayouts/layout1'
import Input from '../../components/inputs/mainInput'
import PasswordInp from '../../components/inputs/password'
import Button from '../../components/buttons/goldBtn'
/* other */
import { routesMap } from '../../routes'
import {
  errorShow
} from '../../Redux/actionCreators'

/* styles */
import md from './styles.module.scss'

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;


export default function RegistrationPage(props) {
  console.log('RegistrationPage')

  const [login, { data, loading }] = useMutation(LOGIN)

  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: {
      value: '',
      errMessage: 'Не корректный email',
      isValid: true,
      validate: (value) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(value.trim())
      }
    },
    password: {
      value: '',
      validate: (value) => { return true }
    }
  })

  const onChange = (e, name) => {
    if (state[name].validate(e.target.value))
      setState({
        ...state, [name]:
        {
          ...state[name],
          value: e.target.value,
          isValid: true
        }
      })
    else
      setState({
        ...state, [name]:
        {
          ...state[name],
          value: e.target.value,
          isValid: false
        }
      })
  }

  <form className={md.form}>
    <input
      className={`${md.inp} ${md.inp_email}`}
      type="text" name="firstName" value="Имя"
      onChange={() => { }}
    />
    <input
      className={`${md.inp} ${md.inp_email}`}
      type="text" name="secondName" value="Фамилия"
      onChange={() => { }}
    />
    <input
      className={`${md.inp} ${md.inp_email}`}
      type="email" name="email" value="Электронная почта"
      onChange={() => { }}
    />
    <input
      className={`${md.inp} ${md.inp_password}`}
      type="password" name="password" value="Пароль"
      onChange={() => { }}
    />
    <input
      className={`${md.btn} ${md.inp_password}`}
      type="submit" value="Применить и выйти"
      onChange={() => { }}
    />
    <p>Уже зарегистрированы? Вход</p>
  </form>

  const form = <form
    className={md.form}
    onSubmit={(e) => { e.preventDefault() }}>
    <Input
      disabled={loading}
      value={state.email.value}
      type="email"
      name="email"
      placeholder="Электронная почта"
      errMessage={state.email.errMessage}
      isValid={state.email.isValid}
      onChange={(e) => { onChange(e, "email") }}
    />
    <PasswordInp
      disabled={loading}
      value={state.password.value}
      name="password"
      placeholder="Пароль"
      onChange={(e) => { onChange(e, "password") }}
    />
    <Button
      type="submit"
      disabled={loading}
      onClick={async (e) => {
        try {
          const email = state.email.value
          const password = state.password.value
          let response = await login({ variables: { email, password } })
          let token = response.data.login.token
          window.localStorage.setItem("token", token)
        } catch (error) {
          dispatch(errorShow("Пользователь с такими почтой и паролем\n не найден!"))
        }
      }}
    >{loading ? "Вход в систему, ждите..." : "Войти в систему"}</Button>
  </form>

  return (
    <>
      <PageLayout
        form={form}
      >

        {
          loading ?
            <p className={`${md.question}`}> Уже зарегистрированы? Вход</p>
            :
            <p>Уже зарегистрированы? <Link
              className={`${md.registration}`}
              to={routesMap.registration}>Вход</Link></p>

        }

      </PageLayout>
    </>
  )
}