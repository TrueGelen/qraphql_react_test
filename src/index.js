/* libs */
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat
} from '@apollo/client';
/* styles */
import '../node_modules/normalize.css/normalize.css'
import commonStyles from './scss/main.module.scss'
/* components */
import App from './js/app'
/* other */
import store from './js/Redux/store'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/api' });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    }
  });
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

ReactDom.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.querySelector('#app')
)