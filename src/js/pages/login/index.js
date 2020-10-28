/* lib */
import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'

/* components */
import PageLayout from '../../components/pageLayouts/layout1'
import Input from '../../components/inputs/mainInput'
/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './styles.module.scss'

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;


function LogInPage(props) {
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
    className={moduleStyles.form}
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
    <input
      className={`${moduleStyles.inp} ${moduleStyles.inp_password}`}
      type="password" name="password" placeholder="Пароль"
      onChange={() => { }} />
    <input
      className={`${moduleStyles.btn} ${moduleStyles.inp_password}`}
      type="submit" value="Войти в систему"
      onClick={async (e) => {
        let res = await login({ variables: { email: "racer@mail.com", password: "123456" } })
        let token = res.data.login.token
        console.log(token)
        window.localStorage.setItem("token", token)
      }} />
    <p>Зарегистрироваться</p>
  </form>

  return (
    <PageLayout
      form={form}
    />
  )
}

export default LogInPage