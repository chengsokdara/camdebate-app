import React from 'react'
import Navigator from './screens'

import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import store from './service/store'
import theme from './resources/theme'

import { Layout } from './components'

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Layout>
          <Navigator />
        </Layout>
      </PaperProvider>
    </ReduxProvider>
  )
}

export default App
