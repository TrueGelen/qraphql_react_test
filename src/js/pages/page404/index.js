/* lib */
import React from 'react'
/* components */
import E404 from '../../components/errors/404/'
/* styles */
import md from './styles.module.scss'

/* code */
function Page404(props) {

  return (
    <E404>
      <p
        className={md.goToTheMain}
        onClick={() => { props.history.push("/") }}>Вернуться на главную!</p>
    </E404>
  )
}

export default Page404