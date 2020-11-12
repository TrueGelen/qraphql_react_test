/* libs */
import React from 'react'
import PropTypes from 'prop-types'
/* components */
/* styles */
import md from './styles.module.scss'
/* imgs */
import proceset_logo_png from '../../../../img/proceset_logo.png'

export default function PageLayout({
  className,
  ...props }) {

  return (
    <div className={md.pageWrapper}>
      <img
        className={md.logo}
        src={proceset_logo_png} />

      <div className={md.formWrapper}>
        {props.children}
      </div>

    </div>
  )
}

PageLayout.defaultProps = {
  className: undefined
}

PageLayout.propTypes = {
  className: PropTypes.string
}