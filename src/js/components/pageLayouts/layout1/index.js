/* lib */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

/* components */

/* styles */
import moduleStyles from './styles.module.scss'

export default function PageLayout({
  className,
  form,
  ...props }) {

  return (
    <>
      <div className={moduleStyles.pageWrapper}>
        <img
          className={moduleStyles.logo}
          src="/assets/imgs/proceset_logo.png" />

        <div className={moduleStyles.formWrapper}>
          {form}
          {props.children}
        </div>

      </div>
    </>
  )
}

PageLayout.defaultProps = {
  className: undefined,
  form: []
}

PageLayout.propTypes = {
  className: PropTypes.string,
  form: PropTypes.node
}