/* libs */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import {
	useQuery,
	gql
} from '@apollo/client';

/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'

/* styles */
import md from './app.module.scss'
import mainStyles from '../../scss/main.module.scss'

/* other */
import { routes, routesMap } from '../routes'
import {
	errorHide,
	login
} from '../Redux/actionCreators'
import { baseUrl } from '../Redux/constants'

const GET_USER_BY_ID = gql`
  query ($id: Int!){
    userById(id: $id){
      id
    }
  }
`;

const CURRENT_USER = gql`
	query{
		currentUser{
			id
		}
	}
`;

function App(props) {
	console.log("App")
	// let loading = false
	// let error = false
	// const { loading, error, data } = useQuery(GET_USER_BY_ID,
	// 	{
	// 		variables: { id: 1 }
	// 	});
	const [menu, setMenu] = useState(true)
	const { loading, error, data = null } = useQuery(CURRENT_USER);

	const dispatch = useDispatch()
	const errStore = useSelector(state => state.errStore)
	const userId = useSelector(state => state.user.id)

	let isAuthorized = data ? true : false
	if (data && data.currentUser.id !== userId) {
		dispatch(login(data.currentUser.id))
	}

	// let isAuthorized = false
	const openMenu = () => {
		setMenu(true)
	}

	const hideMenu = () => {
		console.log(1)
		setMenu(false)
	}

	/* const authRouters = ["login", "registration"]

	let authorizedRouters = []
	let nonAuthorizedRouters = []
	routes.forEach((route) => {
		if (!(route.name === authRouters[0]) && !(route.name === authRouters[1])) {
			authorizedRouters.push(<Route path={route.url}
				component={route.container}
				exact={route.exact}
				key={route.url}
			/>
			)
		} else
			nonAuthorizedRouters.push(<Route path={route.url}
				component={route.container}
				exact={route.exact}
				key={route.url}
			/>)
	})*/

	const routesComponents = routes.map((route) => {
		return <Route path={route.url}
			component={route.container}
			exact={route.exact}
			key={route.url}
		/>
	})

	return (
		<Router>
			<>
				{loading ? <LoadingSpinner />
					:
					<>
						{
							!isAuthorized &&
							<Redirect
								to={{
									pathname: "/login"
									// pathname: "/registration"
								}}
							/>
						}
						<header className={md.header}>
							<div className={`${md.btnMenu} ${menu && md.btnMenu_invisible}`}
								onClick={openMenu}>
								<img src={`${baseUrl}assets/imgs/menu.png`} />
								<p>Меню</p>
							</div>
						</header>
						{/* content */}
						<main className={md.content}>
							<Switch>
								{routesComponents}
							</Switch>
						</main>
					</>
				}

				{
					menu &&
					<div className={md.menuWrapper}>
						<menu className={md.menuLeftPart}>
							<div className={`${md.btnMenu} ${md.btnMenu_opened}`}
								onClick={hideMenu}>
								<img src={`${baseUrl}assets/imgs/menu.png`} />
								<p>proceset</p>
							</div>
							<ul className={md.menu}>
								<li>
									<img src={`${baseUrl}assets/imgs/user_icon.png`} />
									<p>{"username"}</p>
								</li>
								<li>
									<img src={`${baseUrl}assets/imgs/process_icon.png`} />
									<p>Список процессов</p>
								</li>
							</ul>
						</menu>
						<div className={md.menuRightPart}
							onClick={hideMenu}></div>
					</div>
				}

				<NoticeError
					text={errStore.errMessage}
					onClose={() => { dispatch(errorHide()) }}
					isError={errStore.isError}
				/>

			</>
		</Router >
	)
}

export default App



// isAuthorized ?
// 						<>
// 							< header className={md.header}>
// 								<div className={md.btnMenu}>
// 									<img src={`${baseUrl}assets/imgs/menu.png`} />
// 									<p>Меню</p>
// 								</div>
// 							</header>
// 							{/* content */}
// 							<main className={md.content}>
// 								<Switch>
// 									{routesComponents}
// 								</Switch>
// 								{/* {<Switch>
// 									{authorizedRouters}
// 								</Switch>} */}
// 							</main>
// 						</>
// 						:
// 						<>
// 							{<Redirect
// 								to={{
// 									// pathname: "/login"
// 									// pathname: "/registration"
// 									pathname: "/lk"
// 								}}
// 							/>}
// 							<Switch>
// 								{nonAuthorizedRouters}
// 							</Switch>
// 						</>