/* lib */
import React from 'react'
import PropTypes from 'prop-types'

/* styles */
import md from './styles.module.scss'

/* code */
export default function Input({
  value,
  type,
  name,
  placeholder,
  onChange,
  className,
  isValid,
  disabled,
  errMessage,
  ...props
}) {


  return (
    <div className={`${md.wrap} ${className}`}>
      <input
        className={`${isValid ? md.inp : md.err}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <p
        className={`${md.errMessage} ${isValid && md.invisible}`}
      >{errMessage == "" ? "Текст для высоты" : errMessage}</p>
    </div>
  )
}

Input.defaultProps = {
  value: '',
  type: 'text',
  name: '',
  placeholder: '',
  onChange: () => { },
  className: null,
  isValid: true,
  disabled: false,
  errMessage: 'Текст для высоты'
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  errMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}