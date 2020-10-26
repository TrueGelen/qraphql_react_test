/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */

/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './styles.module.scss'


function RegistrationPage(props) {
  console.log('RegistrationPage')

  // const dispatch = useDispatch()
  // const tvsStore = useSelector(state => state.televisions)

  useEffect(() => {
  }, [])


  return (
    <div className={moduleStyles.container}>

      <img
        className={moduleStyles.logo}
        src="/assets/imgs/proceset_logo.png" />

      <form className={moduleStyles.form}>
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_email}`}
          type="text" name="firstName" value="Имя"
          onChange={() => { }}
        />
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_email}`}
          type="text" name="secondName" value="Фамилия"
          onChange={() => { }}
        />
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_email}`}
          type="email" name="email" value="Электронная почта"
          onChange={() => { }}
        />
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_password}`}
          type="password" name="password" value="Пароль"
          onChange={() => { }}
        />
        <input
          className={`${moduleStyles.btn} ${moduleStyles.inp_password}`}
          type="submit" value="Применить и выйти"
          onChange={() => { }}
        />
        <p>Уже зарегистрированы? Вход</p>
      </form>

    </div>
  )
}

export default RegistrationPage