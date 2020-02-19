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
import React from 'react'
import styled from 'styled-components/native'
import { WebView } from 'react-native-webview'

import { AppBar } from '../../components'

const ScheduleScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar
        title="My Schedule"
        onNotiPress={() => navigation.navigate('Notification')}
      />
      <WebView source={{ uri: 'https://www.camdebate.org/MyCamDEBATE.aspx' }} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

export default ScheduleScreen
