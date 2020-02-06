import React from 'react'
import Navigator from './screens'

import { ApolloProvider } from '@apollo/react-hooks'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import client from './service/client'
import store from './service/store'
import theme from './resources/theme'

import { Layout } from './components'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <Layout>
            <Navigator />
          </Layout>
        </PaperProvider>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App
