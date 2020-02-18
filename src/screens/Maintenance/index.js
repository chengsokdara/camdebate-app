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
import { BackHandler, Platform } from 'react-native'
import {
  Button as PaperButton,
  Caption as PaperCaption
} from 'react-native-paper'

import { AppBar } from '../../components'

const MaintenanceScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar title="Maintenance" />
      <Content>
        <Text>{'CamDebate App\nis currently down for maintenance.'}</Text>
        <Caption>
          {'We expect to be back in a couple hours.\nThanks for your patience.'}
        </Caption>
        {Platform.OS === 'android' ? (
          <Button mode="contained" onPress={() => BackHandler.exitApp()}>
            Close App
          </Button>
        ) : null}
      </Content>
    </Container>
  )
}

const Button = styled(PaperButton)`
  margin-top: 20px;
`

const Caption = styled(PaperCaption)`
  text-align: center;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

export default MaintenanceScreen
