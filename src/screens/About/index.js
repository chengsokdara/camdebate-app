import React from 'react'
import styled from 'styled-components/native'

const AboutScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>Open Source</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Text = styled.Text`
  font-size: 16px;
`

const TextSection = styled(Text)`
  font-weight: bold;
`

export default AboutScreen
