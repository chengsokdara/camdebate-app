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

import { AppBar } from '../../components'

const PaymentScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar
        backable
        onBackPress={() => navigation.goBack()}
        onNotiPress={() => navigation.navigate('Notification')}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

export default PaymentScreen
