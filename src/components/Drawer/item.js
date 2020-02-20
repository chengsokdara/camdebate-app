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

const DrawerItem = ({ title, onPress }) => {
  return (
    <Container underlayColor="#aeaeae" onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.TouchableHighlight`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
`

const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
`

export default DrawerItem
