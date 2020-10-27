/* lib */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

/* components */

/* styles */
import moduleStyles from './styles.module.scss'

export default function PageLayout({
  className,
  ...props }) {

  return (
    <>
      <div className={moduleStyles.pageWrapper}>
        {props.children}
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