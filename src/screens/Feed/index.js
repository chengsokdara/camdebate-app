import React from 'react'
import styled from 'styled-components/native'
import { useQuery } from '@apollo/react-hooks'
import { FlatList } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'

//import { MockNews } from '../../resources/mocks'
import { FeedsQuery } from '../../resources/queries'
import { AppBar } from '../../components'
import { FeedItem } from './components'

const FeedScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(FeedsQuery)
  const { token } = useSelector(state => state.auth, shallowEqual)
  console.log('FeedScreen token', token)

  if (loading) console.log('GraphQL loading...')
  if (error) console.log('GaphQL error!', error)
  console.log('GraphQL data', data)

  const sortedData = data
    ? data.feeds.feeds.sort((a, b) => b.FeedID - a.FeedID)
    : []

  return (
    <Container>
      {token ? (
        <AppBar onNotiPress={() => navigation.navigate('Notification')} />
      ) : (
        <AppBar />
      )}
      <FlatList
        refreshing={loading}
        data={sortedData}
        renderItem={({ item }) => <FeedItem item={item} />}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={item => `${item.FeedID}`}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 5
        }}
        onRefresh={() => refetch()}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Separator = styled.View`
  height: 5px;
`

export default FeedScreen
