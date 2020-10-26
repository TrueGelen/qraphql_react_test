/* lib */
import React, { useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'

/* components */

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

  // const dispatch = useDispatch()
  // const tvsStore = useSelector(state => state.televisions)

  const [login, { data }] = useMutation(LOGIN);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  useEffect(() => {
  }, [])

  // console.log("data", data)

  return (
    <div className={moduleStyles.container}>

      <img
        className={moduleStyles.logo}
        src="/assets/imgs/proceset_logo.png" />

      <form className={moduleStyles.form}
        onSubmit={(e) => { e.preventDefault() }}
      >
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_email}`}
          type="email" name="email" defaultValue="Электронная почта"
          onChange={(e) => { }}
        />
        <input
          className={`${moduleStyles.inp} ${moduleStyles.inp_password}`}
          type="password" name="password" defaultValue="Пароль"
          onChange={() => { }}
        />
        <input
          className={`${moduleStyles.btn} ${moduleStyles.inp_password}`}
          type="submit" value="Войти в систему"
          onClick={async (e) => {
            let res = await login({ variables: { email: "racer@mail.com", password: "123456" } })
            let token = res.data.login.token
            console.log(token)
            window.localStorage.setItem("token", token)
          }}
        />
        <p>Зарегистрироваться</p>
      </form>

    </div>
  )
}

export default LogInPage