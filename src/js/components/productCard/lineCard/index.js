/* lib */
import React from 'react'
import PropTypes from 'prop-types'

/* styles */
import moduleStyles from './LineCard.module.scss'

export default function LineCard({
  className,
  onClick,
  img,
  title,
  price,
  rest,
  description,
  button,
  labels,
  counter,
  inCart,
  ...otherProps }) {

  let arrDescription = []

  for (let key in description) {
    if (key !== 'about') {
      let p = <p key={Math.random()}>{labels[key]}: <span>{description[key]}</span></p>
      arrDescription.push(p)
    }
  }

  return (
    <div {...otherProps} className={`${moduleStyles.productCard} ${className}`}>
      <div className={moduleStyles.imgContainer}>
        {
          img &&
          <img
            src={img.path}
            className={`${moduleStyles.imgInCard} ${img.styles}`}>
          </img>
        }
      </div>

      <div className={moduleStyles.descriptionBlock}>
        <h2
          className={`${moduleStyles.title} ${title.styles}`}
          onClick={onClick}>
          {title.text}
        </h2>

        <div className={moduleStyles.description}>
          {arrDescription}
        </div>
      </div>

      <div className={moduleStyles.priceBlock}>
        <p><span>цена:</span> {price.text} <span>р.</span></p>
        {inCart && counter}
        {button}
      </div>
    </div>
  )
}

LineCard.defaultProps = {
  className: undefined,
  onClick: () => { },
  img: {
    path: null,
    styles: null
  },
  title: {
    styles: null,
    text: null
  },
  price: {
    styles: null,
    text: null
  },
  rest: {
    styles: null,
    text: null
  },
  description: {},
  labels: {},
  button: null,
  counter: null,
  inCart: true
}

LineCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  img: PropTypes.shape({
    path: PropTypes.string,
    styles: PropTypes.string
  }),
  title: PropTypes.shape({
    styles: PropTypes.string,
    text: PropTypes.string
  }),
  price: PropTypes.shape({
    styles: PropTypes.string,
    text: PropTypes.string
  }),
  rest: PropTypes.shape({
    styles: PropTypes.string,
    text: PropTypes.string
  }),
  labels: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.node,
  counter: PropTypes.node,
  inCart: PropTypes.bool
}