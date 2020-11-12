/* lib */
import React, { useState, useCallback } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'

/* components */
import PageLayout from '../../components/pageLayouts/layout2'
import Button from '../../components/buttons/goldBtn'
import Input from '../../components/inputs/mainInput'
import PasswordInp from '../../components/inputs/password'
import LoadingSpinner from '../../components/loadingSpinner'

/* other */
// import { urlBuilder } from '../../routes'
import {
  errorShow
} from '../../Redux/actionCreators'

/* styles */
import md from './styles.module.scss'

const GET_USER_BY_ID = gql`
  query($id: Int!){
    userById(id: $id){
      id,
      firstName,
      secondName,
      email
    }
  }
`;

const EDIT_USER = gql`
	mutation($id: Int!, $firstName: String!, $secondName: String!, $email: String!, $password: String!){
		editUser(id: $id, firstName:$firstName, secondName: $secondName, email: $email, password:$password){
      id
    }
	}
`;

function LKPage(props) {
  const dispatch = useDispatch()
  const id = useSelector(state => state.user.id)

  const { loading: GUBILoading, error: GUBIErrore, data: GUBIData } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const [editUser, {
    loading: editLoading,
    error: editErrore,
    data: editData
  }] = useMutation(EDIT_USER)

  if (GUBIErrore) {
    dispatch(errorShow("Не удалось получить данные с сервера :(\r\n Попробуйте позже"))
    props.history.push('/')
  }

  const { firstName = "", secondName = "", email = "" } = GUBIData ? GUBIData.userById : {}

  const [itWasSavedFlagForBtn, setItWasSavedFlagForBtn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [formState, setFormState] = useState({
    firstName: {
      value: firstName,
      errMessage: 'Поле "имя" должно содержать минимум два символа и не должно содержать цифр.',
      isValid: true,
      validate: (value, _state) => {
        return /^[a-zA-Zа-яА-Я']{2,}$/
          .test(value.trim())
      }
    },
    secondName: {
      value: secondName,
      errMessage: 'Поле "фамилия" должно содержать минимум два символа и не должно содержать цифр.',
      isValid: true,
      validate: (value, _state) => {
        return /^[a-zA-Zа-яА-Я']{1,}$/
          .test(value.trim())
      }
    },
    email: {
      value: email,
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

  const onChange = useCallback((e, field = null) => {
    const value = typeof e === "string" ? e : e.target.value
    const name = field ? field : e.target.name
    setFormState(prevState => {
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

  const updateStateOnGetData = () => {
    const fieldsToUpdate = {
      firstName,
      secondName,
      email
    }
    if (GUBIData) {
      for (let field in fieldsToUpdate) {
        onChange(fieldsToUpdate[field], field)
      }
      setIsLoaded(true)
    }
  }
  if (!GUBILoading && !isLoaded) { updateStateOnGetData() }

  const makeRequestOnEditUser = async (_formState) => {
    try {
      const firstName = _formState.firstName.value
      const secondName = _formState.secondName.value
      const email = _formState.email.value
      const password = _formState.password.value
      const response = await editUser({ variables: { id, email, firstName, secondName, password } })
      if (response) {
        setItWasSavedFlagForBtn(true)
        setTimeout(() => {
          setItWasSavedFlagForBtn(false)
        }, 3000)
      }
    } catch (e) {
      dispatch(errorShow("Что то пошло не так :(\r\n Попробуйте позже"))
    }
  }

  const onSubmit = useCallback(() => {
    setFormState(prevState => {
      const fields = Object.keys(prevState)
      if (fields.every(field => prevState[field].value !== '' && prevState[field].isValid)) {
        makeRequestOnEditUser(prevState)
      } else {
        fields.forEach(field => onChange(prevState[field].value, field))
      }
      return prevState
    })
  }, [])

  return (
    <>
      {GUBILoading ?
        <LoadingSpinner />
        :
        <PageLayout
          className={md.layout}>

          <div className={md.header}>
            <p className={md.header__title}>{`${firstName} ${secondName}. Редактирование`}</p>
            <Button
              disabled={editLoading || itWasSavedFlagForBtn}
              value={editLoading ? "Сохранение..." : itWasSavedFlagForBtn ? "Сохранено" : "Сохранить"}
              onClick={onSubmit}
            />
          </div>

          <ul className={md.userData}>
            <li className={md.userData__item}>
              <label className={md.userData__label}>Имя</label>
              <Input
                className={md.userData__inp}
                disabled={editLoading}
                value={formState.firstName.value}
                type="text"
                name="firstName"
                placeholder="Имя"
                errMessage={formState.firstName.errMessage}
                isValid={formState.firstName.isValid}
                onChange={onChange} />
            </li>
            <li className={md.userData__item}>
              <label className={md.userData__label}>Фамилия</label>
              <Input
                className={md.userData__inp}
                disabled={editLoading}
                value={formState.secondName.value}
                type="text"
                name="secondName"
                placeholder="Фамилия"
                errMessage={formState.secondName.errMessage}
                isValid={formState.secondName.isValid}
                onChange={onChange} />
            </li>
            <li className={md.userData__item}>
              <label className={md.userData__label}>Электронная почта</label>
              <Input
                className={md.userData__inp}
                disabled={editLoading}
                value={formState.email.value}
                type="email"
                name="email"
                placeholder="Электронная почта"
                errMessage={formState.email.errMessage}
                isValid={formState.email.isValid}
                onChange={onChange} />
            </li>
            <li className={md.userData__item}>
              <label className={md.userData__label}>Новый (или старый) пароль</label>
              <PasswordInp
                className={md.userData__inp}
                disabled={editLoading}
                value={formState.password.value}
                name="password"
                placeholder="Не задано"
                errMessage={formState.password.errMessage}
                isValid={formState.password.isValid}
                onChange={onChange} />
            </li>
            <li className={md.userData__item}>
              <label className={md.userData__label}>Повторите пароль</label>
              <PasswordInp
                className={md.userData__inp}
                disabled={editLoading}
                value={formState.checkPassword.value}
                name="checkPassword"
                placeholder="Не задано"
                errMessage={formState.checkPassword.errMessage}
                isValid={formState.checkPassword.isValid}
                onChange={onChange} />
            </li>
          </ul>
        </PageLayout>
      }
    </>
  )

}

export default LKPage