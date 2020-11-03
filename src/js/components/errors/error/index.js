/* lib */
import React from 'react'
import PropTypes from 'prop-types'
/* other */
import { baseUrl } from '../../../Redux/constants'
/* styles */
import md from './styles.module.scss'

/* code */
export default function AError({ text, onClose, className, ...props }) {

  let errMessage = text === '' ? 'Ошибка не передана или не известна!' : text

  return (
    <div className={`${md.errorLayout} ${className && className}`}>
      <img className={md.dangerLogo} src={`${baseUrl}assets/imgs/danger.png`} />
      <p className={md.errMessage}>{errMessage}</p>
    </div>
  )
}

AError.defaultProps = {
  className: null,
  text: 'Ошибка не передана или не известна!'
}

AError.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string
}