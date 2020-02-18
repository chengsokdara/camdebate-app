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
import React, { useState } from 'react'
import { ProgressBar } from 'react-native-paper'
import { WebView } from 'react-native-webview'

import { AppBar } from '../../components'
import { primaryColor } from '../../resources'

const WebScreen = ({ navigation }) => {
  const { uri } = navigation.state.params
  const [progress, setProgress] = useState(0)
  console.log('WebScreen progress', progress)

  console.log('WebScreen', uri)
  return (
    <>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <ProgressBar progress={progress} color={primaryColor} />
      <WebView
        source={{ uri }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
      />
    </>
  )
}

export default WebScreen
