/* lib */
import React, { useState } from 'react'
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


export default function LogInPage(props) {
  console.log('LogInPage')

  const [login, { data }] = useMutation(LOGIN);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
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

  const form = <form
    className={md.form}
    onSubmit={(e) => { e.preventDefault() }}>
    <Input
      value={state.email.value}
      type="email"
      name="email"
      placeholder="Электронная почта"
      errMessage={state.email.errMessage}
      isValid={state.email.isValid}
      onChange={(e) => { onChange(e, "email") }}
    />
    <PasswordInp
      value={state.password.value}
      name="password"
      placeholder="Пароль"
      onChange={(e) => { onChange(e, "password") }}
    />
    <Button
      type="submit"
      onClick={async (e) => {
        /* let res = await login({ variables: { email: "racer@mail.com", password: "123456" } })
        let token = res.data.login.token
        console.log(token)
        window.localStorage.setItem("token", token)*/
      }}
    >Войти в систему</Button>
  </form>

  return (
    <>
      <PageLayout
        form={form}
      >
        <Link
          className={`${md.registration}`}
          to={routesMap.registration}>Зарегистрироваться</Link>
      </PageLayout>
    </>
  )
}

// export default LogInPage