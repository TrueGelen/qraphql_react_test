import React, { Children } from 'react'
import PropTypes from 'prop-types'

import md from './index.module.scss'

export default function Button({
  className,
  onClick,
  type,
  disabled,
  ...props }) {

  const clickHandler = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <input
      className={`${md.btn}
        ${className && className}`}
      type={type}
      value="Войти в систему"
      onClick={clickHandler}
      disabled={disabled}>
    </input>
  )
}

Button.defaultProps = {
  type: "button",
  className: undefined,
  disabled: false,
  onClick: () => { }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
}