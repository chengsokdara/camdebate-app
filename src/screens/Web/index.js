import React from 'react'
import styled from 'styled-components'
import { WebView } from 'react-native-webview'

import { AppBar } from '../../components'

const WebScreen = ({ navigation }) => {
  const { uri } = navigation.state.params
  console.log('WebScreen', uri)
  return (
    <>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <WebView source={{ uri }} />
    </>
  )
}

export default WebScreen
