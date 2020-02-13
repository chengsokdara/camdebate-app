import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import Navigator from './screens'
import client from './service/client'
import store from './service/store'
import { ONESIGNAL_APP_ID } from './resources'
import theme from './resources/theme'

import { Layout } from './components'

const App = () => {
  const onReceived = notification => {
    console.log('onReceived', notification)
  }

  const onOpened = openResult => {
    console.log('onOpened', openResult)
  }

  const onIds = device => {
    console.log('Device info: ', device)
  }

  useEffect(() => {
    OneSignal.init(ONESIGNAL_APP_ID)
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', onOpened)
    OneSignal.addEventListener('ids', onIds)
    return () => {
      OneSignal.removeEventListener('received', onReceived)
      OneSignal.removeEventListener('opened', onOpened)
      OneSignal.removeEventListener('ids', onIds)
    }
  }, [])
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
