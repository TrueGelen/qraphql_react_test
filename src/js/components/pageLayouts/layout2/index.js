/* lib */
import React from 'react'
import PropTypes from 'prop-types'

/* components */

/* styles */
import moduleStyles from './styles.module.scss'

export default function PageLayout({
  className,
  ...props }) {

  return (
    <>
      <div className={`${moduleStyles.layout} ${className}`}>
        {props.children}
      </div>
    </>
  )
}

PageLayout.defaultProps = {
  className: undefined
}

PageLayout.propTypes = {
  className: PropTypes.string
}