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
import { Card } from 'react-native-paper'

const Empty = ({ message = 'No Items.', style = { minHeight: 200 } }) => {
  return (
    <Card style={style}>
      <Content>
        <Text>{message}</Text>
      </Content>
    </Card>
  )
}

const Content = styled(Card.Content)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-size: 16px;
`

export default Empty
