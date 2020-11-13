/* lib */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
/* styles */
import md from './styles.module.scss'

function PageLayout({
  className,
  ...props }) {

  return (
    <div className={`${md.layout} ${className}`}>
      {props.children}
    </div>
  )
}

export default memo(PageLayout)

PageLayout.defaultProps = {
  className: undefined
}

PageLayout.propTypes = {
  className: PropTypes.string
}