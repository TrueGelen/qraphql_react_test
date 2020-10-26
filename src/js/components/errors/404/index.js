/* lib */
import React, { Children } from 'react'
// import PropTypes from 'prop-types'

/* styles */
import moduleStyles from './styles.module.scss'

/* code */
export default function E404(props) {

  return (
    <div className={moduleStyles.container}>
      <p>404 not found</p>
      {props.children}
    </div>
  )
}