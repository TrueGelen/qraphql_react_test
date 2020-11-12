/* lib */
import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
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
} from '../../Redux/actionCreators'

/* styles */
import md from './styles.module.scss'

const SINGUP = gql`
	mutation($firstName: String!, $secondName: String!, $email: String!, $password: String!){
		signup(firstName:$firstName, secondName: $secondName, email: $email, password:$password)
	}
`;

export default function RegistrationPage(props) {
  const [singup, { data, loading, error }] = useMutation(SINGUP)

  const isAuthorized = useSelector(state => state.user.isAuthorized)

  const [state, setState] = useState({
    firstName: {
      value: '',
      errMessage: 'Поле "имя" должно содержать минимум два символа и не должно содержать цифр.',
      isValid: true,
      validate: (value, _state) => {
        return /^[a-zA-Zа-яА-Я']{2,}$/
          .test(value.trim())
      }
    },
    secondName: {
      value: '',
      errMessage: 'Поле "фамилия" должно содержать минимум два символа и не должно содержать цифр.',
      isValid: true,
      validate: (value, _state) => {
        return /^[a-zA-Zа-яА-Я']{1,}$/
          .test(value.trim())
      }
    },
    email: {
      value: '',
      errMessage: 'Не корректный email',
      isValid: true,
      validate: (value, _state) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(value.trim())
      }
    },
    password: {
      value: '',
      errMessage: 'Пароль должен состоять из цифр, букв и хотя бы одного спец. символа из [!@#$%&_=.`~,[]:;|\/]. Так же всего должно быть не меньше 8 символов.',
      isValid: true,
      validate: (value, _state) => {
        const regExs = [
          //with digital
          /^.*[0-9]+.*$/,
          //with special characters
          /^.*[!@#$%&_=\.`~,\[\]:;\{\}\|\\\/]+.*$/,
          //with letters
          /^.*[a-zA-Z]+.*$/,
          //8+ symbols
          /^[\d\w\!\@\#\$\%\&\_\=\.\`\~\,\[\:\;\{\}\|\\\/]{8,}/
        ]

        return regExs.every(reg => reg.test(value))
      }
    },
    checkPassword: {
      value: '',
      errMessage: 'Пароли не совпадают',
      isValid: true,
      validate: (value, _state) => value === _state.password.value && value !== ''
    }
  })

  const onChange = useCallback((e, val, field) => {
    const value = e ? e.target.value : val
    const name = e ? e.target.name : field
    setState(prevState => {
      const isValid = prevState[name].validate(value, prevState)
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

  const makeRequestAndLogin = async () => {
    try {
      const firstName = state.firstName.value
      const secondName = state.secondName.value
      const email = state.email.value
      const password = state.password.value
      let response = await singup({ variables: { firstName, secondName, email, password } })
      let token = response.data.signup
      window.localStorage.setItem("token", token)
      props.history.go(0)
    } catch (e) {
      //ошибка обработана в шаблоне
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const fields = Object.keys(state)
    if (fields.every(field => state[field].value !== '' && state[field].isValid)) {
      makeRequestAndLogin()
    } else {
      fields.forEach(field => onChange(null, state[field].value, field))
    }
  }

  const form = <form
    className={md.form}
    onSubmit={onSubmit}>
    <Input
      disabled={loading}
      value={state.firstName.value}
      type="text"
      name="firstName"
      placeholder="Имя"
      errMessage={state.firstName.errMessage}
      isValid={state.firstName.isValid}
      onChange={onChange}
    />
    <Input
      disabled={loading}
      value={state.secondName.value}
      type="text"
      name="secondName"
      placeholder="Фамилия"
      errMessage={state.secondName.errMessage}
      isValid={state.secondName.isValid}
      onChange={onChange}
    />
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
      placeholder="Введите пароль"
      errMessage={state.password.errMessage}
      isValid={state.password.isValid}
      onChange={onChange}
    />
    <PasswordInp
      disabled={loading}
      value={state.checkPassword.value}
      name="checkPassword"
      placeholder="Повторите пароль"
      errMessage={state.checkPassword.errMessage}
      isValid={state.checkPassword.isValid}
      onChange={onChange}
    />
    <Button
      type="submit"
      disabled={loading}
      value={loading ? "Идет отправка на сервер..." : "Регистрация"}
    />
  </form>

  let statusCode = null
  if (error) {
    if (error.networkError)
      statusCode = error.networkError.statusCode
    else
      statusCode = error.graphQLErrors[0].statusCode
  }
  return (
    <>
      {!isAuthorized ?
        <PageLayout>
          {form}
          {
            loading ?
              <p className={`${md.question}`}> Уже зарегистрированы? Вход</p>
              :
              <p>Уже зарегистрированы? <Link
                className={`${md.registration}`}
                to={routesMap.login}>Вход</Link></p>
          }
          {
            error && <AError className={md.errorNotification}
              text={statusCode === 500 ? "Такой email уже зарегистрирован."
                : "Ошибка :( Попробуйте позже"} />
            // "Ошибка :( Попробуйте позже"
            // `${error}  || erSC: ${statusCode}`
          }
        </PageLayout>
        :
        <Redirect to="/" />
      }
    </>
  )
}