import React from 'react'
import PropTypes from 'prop-types'

import moduleStyles from './index.module.scss'

export default function BtnAddToCart({
  className,
  onAdd,
  onRemove,
  inCart,
  innerOnAdd,
  innerOnRemove,
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
    inCart ?
      <div {...otherProps}
        className={`${moduleStyles.noselect}
				${moduleStyles.mainStyles}
        ${moduleStyles.inCart}
        ${className && className}`}
        onClick={remove}>
        {innerOnRemove}
      </div>
      :
      <div {...otherProps}
        className={`${moduleStyles.noselect}
				${moduleStyles.mainStyles}
				${moduleStyles.nonInCart}
				${className && className}`}
        onClick={add}>
        {innerOnAdd}
      </div>
  )
}

BtnAddToCart.defaultProps = {
  className: undefined,
  onAdd: () => { },
  onRemove: () => { },
  inCart: false,
  innerOnAdd: 'Add to cart',
  innerOnRemove: 'Delete from cart'
}

BtnAddToCart.propTypes = {
  className: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  inCart: PropTypes.bool,
  innerOnAdd: PropTypes.any,
  innerOnRemove: PropTypes.any
}
