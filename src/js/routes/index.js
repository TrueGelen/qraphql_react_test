import RegistrationPage from '../pages/registration'
import LogInPage from '../pages/login'
import LKPage from '../pages/lk'
import Page404 from '../pages/page404'

//for dev
let routes = [
  {
    name: 'home',
    url: '/',
    container: LogInPage,
    exact: true
  },
  {
    name: 'login',
    url: '/login',
    container: LogInPage,
    exact: true
  },
  {
    name: 'registration',
    url: '/registration',
    container: RegistrationPage,
    exact: true
  },
  {
    name: 'lk',
    url: '/lk',
    container: LKPage,
    exact: true
  },
  {
    url: '**',
    container: Page404,
  }
]

let routesMap = {}

routes.forEach(item => {
  if (item.hasOwnProperty('name')) {
    routesMap[item.name] = item.url;
  }
})

let urlBuilder = function (name, id) {
  if (!routesMap.hasOwnProperty(name)) {
    console.error("page doesn't exist")
    return null;
  }

  return `${routesMap[name].replace(":id", id)}`;
}

export { routes, routesMap, urlBuilder }