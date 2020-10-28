import React from 'react'
import PropTypes from 'prop-types'

import moduleStyles from './index.module.scss'

export default function Button({
  className,
  onClick,
  ...otherProps }) {

  const add = (e) => {
    e.stopPropagation()
    onAdd()
  }

  const remove = (e) => {
    e.stopPropagation()
    onRemove()
  }

  return (
    <div {...otherProps}
      className={`${moduleStyles.noselect}
				${moduleStyles.mainStyles}
        ${moduleStyles.inCart}
        ${className && className}`}
      onClick={onClick}>
      {innerOnRemove}
    </div>
  )
}

Button.defaultProps = {
  className: undefined,
  onClick: () => { }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}
