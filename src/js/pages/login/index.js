/* libs */
import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client';
/* components */
import PageLayout from '../../components/pageLayouts/unauthorizedPageLayout'
import Input from '../../components/inputs/mainInput'
import PasswordInp from '../../components/inputs/password'
import Button from '../../components/buttons/goldBtn'
import AError from '../../components/errors/error'
/* other */
import { routesMap } from '../../routes'
import {
  login
} from '../../Redux/actionCreators'
import { LOGIN } from './queries'
/* styles */
import md from './styles.module.scss'

export default function LogInPage(props) {
  const [loginRequest, { error = false, loading }] = useMutation(LOGIN)

  const dispatch = useDispatch()
  const isAuthorized = useSelector(state => state.user.isAuthorized)

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const onChange = useCallback((e) => {
    const value = e.target.value
    const name = e.target.name
    setState(prevState => ({ ...prevState, [name]: value }))
  }, [])

  const onSubmit = async () => {
    const response = await loginRequest({ variables: { ...state } })
    const token = response.data.login.token
    const id = response.data.login.user.id
    window.localStorage.setItem("token", token)
    dispatch(login(id))
    props.history.go(0)
  }

  const regLink = useMemo(() => {
    if (loading)
      return <p className={`${md.registration}`}> Зарегистрироваться </p>
    else
      return <Link
        className={`${md.registration}`}
        to={routesMap.registration}>Зарегистрироваться</Link>
  }, [loading])

  const errorMessage = useMemo(() => {
    if (error) {
      if (!error.networkError) {
        return <AError className={md.errorNotification}
          text="Неправильный логин или пароль" />
      } else {
        return <AError className={md.errorNotification}
          text="Сервер не отвечает, попробуйте позже" />
      }
    }
  }, [error])

  return (
    <>
      {!isAuthorized ?
        <PageLayout>
          <form
            className={md.form}
            onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
            <Input
              disabled={loading}
              value={state.email}
              type="email"
              name="email"
              placeholder="Электронная почта"
              onChange={onChange}
            />
            <PasswordInp
              disabled={loading}
              value={state.password}
              name="password"
              placeholder="Пароль"
              onChange={onChange}
            />
            <Button
              type="submit"
              disabled={loading}
              value={loading ? "Вход в систему, ждите..." : "Войти в систему"}
            ></Button>
          </form >

          {regLink}

          {errorMessage}
        </PageLayout >
        :
        <Redirect to="/" />
      }
    </>
  )
}


