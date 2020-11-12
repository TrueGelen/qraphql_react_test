/* libs */
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
/* components */
import PageLayout from '../../components/pageLayouts/layout1'
import Input from '../../components/inputs/mainInput'
import PasswordInp from '../../components/inputs/password'
import Button from '../../components/buttons/goldBtn'
import AError from '../../components/errors/error'
/* other */
import { routesMap } from '../../routes'
import {
  login
} from '../../Redux/actionCreators'
/* styles */
import md from './styles.module.scss'

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
			token,
			user {
				id
			}
    }
  }
`;

export default function LogInPage(props) {
  // console.log('LogInPage')

  const [loginRequest, { data, error, loading }] = useMutation(LOGIN)

  const dispatch = useDispatch()
  const isAuthorized = useSelector(state => state.user.isAuthorized)

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

  const onChange = useCallback((e) => {
    const value = e.target.value
    const name = e.target.name
    setState(prevState => {
      const isValid = prevState[name].validate(value)
      return {
        ...prevState, [name]:
        {
          ...prevState[name],
          value,
          isValid
        }
      }
    })
  }, [])

  const onSubmit = async () => {
    try {
      const email = state.email.value
      const password = state.password.value
      const response = await loginRequest({ variables: { email, password } })
      const token = response.data.login.token
      const id = response.data.login.user.id
      window.localStorage.setItem("token", token)
      dispatch(login(id))
      // props.history.push("/")
      props.history.go(0)
    } catch (error) {
      // dispatch(errorShow("Пользователь с такими почтой и паролем\n не найден!"))
    }
  }

  const form = <form
    className={md.form}
    onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
    <Input
      disabled={loading}
      value={state.email.value}
      type="email"
      name="email"
      placeholder="Электронная почта"
      errMessage={state.email.errMessage}
      isValid={state.email.isValid}
      onChange={onChange}
    />
    <PasswordInp
      disabled={loading}
      value={state.password.value}
      name="password"
      placeholder="Пароль"
      onChange={onChange}
    />
    <Button
      type="submit"
      disabled={loading}
      value={loading ? "Вход в систему, ждите..." : "Войти в систему"}
    ></Button>
  </form>

  return (
    <>
      {!isAuthorized ?
        <PageLayout>
          {form}
          {
            loading ?
              <p className={`${md.registration}`}> Зарегистрироваться </p>
              :
              <Link
                className={`${md.registration}`}
                to={routesMap.registration}>Зарегистрироваться</Link>
          }
          {
            error && <AError className={md.errorNotification}
              text="Неправильный логин или пароль" />
          }
        </PageLayout>
        :
        <Redirect to="/" />
      }
    </>
  )
}


