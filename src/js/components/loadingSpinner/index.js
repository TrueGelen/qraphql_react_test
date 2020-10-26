/* lib */
import React from 'react'
import PropTypes from 'prop-types'

/* styles */
import moduleStyles from './styles.module.scss'

/* code */
export default function LoadingSpinner({ widthHeight, props }) {

  return (
    <div className={moduleStyles.loader}>
      <div style={{
        width: `${widthHeight}`,
        height: `${widthHeight}`
      }}></div>
    </div>
  )
}

LoadingSpinner.defaultProps = {
  widthHeight: ''
}

LoadingSpinner.propTypes = {
  widthHeight: PropTypes.string,
  // onClose: PropTypes.func.isRequired
}