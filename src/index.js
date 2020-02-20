/**
 * Author: Mr. Cheng Sokdara
 * Repository: https://github.com/chengsokdara/camdebate-app
 *
 * Email: chengsokdara@gmail.com
 * Phone: 086558716
 * Website: https://rawewhat-team.web.app
 * License: MIT
 *
 * Created At: 03/02/2020
 */
import React, { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-community/async-storage'

import { ApolloProvider } from '@apollo/react-hooks'
import { getUniqueId } from 'react-native-device-info'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

import { ONESIGNAL_APP_ID } from './resources'
import { InitAppMutation } from './resources/mutations'
import theme from './resources/theme'
import client from './service/client'
import store from './service/store'
import { Layout } from './components'
import Navigator from './screens'

const App = () => {
  const onReceived = notification => {
    console.log('onReceived', notification)
  }

  const onOpened = openResult => {
    console.log('onOpened', openResult)
  }

  const onIds = async device => {
    console.log('Device info: ', device)
    const firstTime = await AsyncStorage.getItem('firstTime')
    console.log('onIds firstTime:', firstTime)
    const DeviceID = await getUniqueId()
    const { userId: PlayerID } = device
    console.log('onIds DeviceID', DeviceID, 'PlayerID', PlayerID)
    if (!Boolean(firstTime)) {
      // User open app for the first time
      try {
        const res = await client.mutate({
          mutation: InitAppMutation,
          variables: {
            input: {
              DeviceID,
              PlayerID
            }
          }
        })
        const { code, player } = res.data.initApp
        console.log('initApp code', code, 'player', player)
        if (code === 200)
          await AsyncStorage.multiSet([
            ['firstTime', 'true'],
            ['player', JSON.stringify(player)]
          ])
      } catch (e) {
        console.log('initApp error', e)
      }
    } else {
      // User already open app once
      const json = await AsyncStorage.getItem('player')
      const player = JSON.parse(json)
      const changed =
        player && (player.DeviceID !== DeviceID || player.PlayerID !== PlayerID)
      console.log('changed', changed, 'player', player)
      if (changed) {
        const resInitApp = await client.mutate({
          mutation: InitAppMutation,
          variables: {
            ID: player.ID,
            input: {
              ContactID,
              DeviceID,
              PlayerID
            }
          }
        })
        const { code: codeInitApp, player: playerInitApp } = resInitApp
        if (codeInitApp === 200)
          await AsyncStorage.setItem('player', JSON.stringify(playerInitApp))
      }
    }
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
