import React from 'react'
import styled from 'styled-components/native'
import { Card as PaperCard, Card } from 'react-native-paper'

import { AppBar, Empty } from '../../components'

const NotificationDetailScreen = ({ navigation }) => {
  const item = navigation.getParam('item', undefined)
  //const item = null
  console.log('notification detail', item)
  return (
    <Container>
      <AppBar
        backable
        title="Details"
        onBackPress={() => navigation.goBack()}
      />
      <Content>
        {item ? (
          <Card>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.content}</Text>
            </Card.Content>
          </Card>
        ) : (
          <Empty message="No notification details." style={{ flex: 1 }} />
        )}
      </Content>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  padding: 10px;
`

const Text = styled.Text`
  font-size: 16px;
`

export default NotificationDetailScreen
