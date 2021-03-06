import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Contex from './Contex'

import { App } from './App'

const client = new ApolloClient({
  uri: 'https://petgram-server-edsf8xpy2.now.sh/graphql',
  request: (operation) => {
    const token = window.sessionStorage.getItem('token')
    const authorization = token ? `Bearer ${token}` : ''
    operation.setContext({
      headers: {
        authorization
      }
    })
  },

  onError: (error) => {
    const { networkError } = error
    if (networkError && networkError.result.code === 'invalid_token') {
      window.sessionStorage.removeItem('token')
      window.location.href = '/'
    }
  }
})

ReactDOM.render(
  <Contex.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Contex.Provider>,
  document.getElementById('app')
)
