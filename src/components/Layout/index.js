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
import { StatusBar } from 'react-native'
import { primaryColor } from '../../resources'

const Layout = ({ children }) => {
  return (
    <Container>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      {children}
    </Container>
  )
}

const Container = styled.SafeAreaView`
  flex: 1;
`

export default Layout
