import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { Card as PaperCard, TouchableRipple } from 'react-native-paper'

import { AppBar, Empty } from '../../components'
import { MockNotification } from '../../resources/mocks'

const NotificationScreen = ({ navigation }) => {
  const onItemPressed = item => {
    console.log('onItemPressed', item)
    navigation.navigate('Detail', { item })
  }

  return (
    <Container>
      <AppBar
        backable
        title="Notifications"
        onBackPress={() => navigation.navigate('News')}
      />
      <Content>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 10,
            paddingBottom: 10
          }}
          data={MockNotification}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={() => (
            <Empty
              message="No notification."
              style={{ flex: 1, marginHorizontal: 10, marginBotom: 5 }}
            />
          )}
          renderItem={({ item, index, separators }) => (
            <TouchableRipple borderless onPress={() => onItemPressed(item)}>
              <Card>
                <Card.Title title={item.title} />
                <Card.Content>
                  <Text numberOfLines={2}>{item.content}</Text>
                </Card.Content>
              </Card>
            </TouchableRipple>
          )}
        />
      </Content>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
`

const Separator = styled.View`
  height: 5px;
`

const Text = styled.Text`
  font-size: 16px;
`

export default NotificationScreen
