import React, { memo } from 'react'
import PropTypes from 'prop-types'

import md from './index.module.scss'

function Button({
	className,
	onClick,
	type,
	value,
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
			value={value}
			onClick={clickHandler}
			disabled={disabled}>
		</input>
	)
}

export default memo(Button)

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
	disabled: PropTypes.bool,
	value: PropTypes.string.isRequired
}
