/* lib */
import React, { useEffect } from 'react'

/* helpers */

// /* components */
import E404 from '../../components/errors/404/'


/* code */
function Page404(props) {

	return (
		<>
			<E404>
				<p onClick={props.history.goBack}>Вернуться на главную!</p>
			</E404>
		</>
	)
}

export default Page404