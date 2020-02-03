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
