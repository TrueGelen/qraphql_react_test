/* libs */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
/* styles */
import md from './styles.module.scss'
/* imgs */
import proceset_logo_png from '../../../../img/proceset_logo.png'

function UnauthorizedPageLayout({
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

export default UnauthorizedPageLayout

UnauthorizedPageLayout.defaultProps = {
  className: undefined
}

UnauthorizedPageLayout.propTypes = {
  className: PropTypes.string
}