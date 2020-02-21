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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useQuery } from '@apollo/react-hooks'
import { FlatList } from 'react-native'
import { useSelector, shallowEqual } from 'react-redux'

import { primaryColor } from '../../resources'
import { FeedsQuery } from '../../resources/queries'
import { AppBar } from '../../components'
import FeedItem from './item'

const FeedScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(FeedsQuery)
  const { token } = useSelector(state => state.auth, shallowEqual)
  console.log('FeedScreen token', token)

  if (loading) console.log('GraphQL loading...')
  if (error) {
    console.log('GaphQL error!', error)
    navigation.navigate('Maintenance')
  }
  console.log('GraphQL data', data)

  const sortedData =
    data?.feeds?.feeds
      .sort((a, b) => b.FeedID - a.FeedID)
      .sort((a, b) => b.Announcement - a.Announcement) ?? []

  return (
    <Container>
      {token ? (
        <AppBar
          onLogoPress={() => navigation.openDrawer()}
          onNotiPress={() => navigation.navigate('Notification')}
        />
      ) : (
        <AppBar onLogoPress={() => navigation.openDrawer()} />
      )}
      <FlatList
        refreshing={loading}
        data={sortedData}
        renderItem={({ item, index }) => {
          if (index === 0)
            return !token ? (
              <>
                <ContainerSection>
                  <Icon name="bullhorn" size={22} color={primaryColor} />
                  <SectionTitle color={primaryColor}>ANNOUNCEMENT</SectionTitle>
                </ContainerSection>
                <FeedItem item={item} navigation={navigation} />
              </>
            ) : null
          if (index === 1)
            return (
              <>
                <ContainerSection>
                  <Icon name="newspaper" size={22} color={primaryColor} />
                  <SectionTitle color={primaryColor}>NEWS</SectionTitle>
                </ContainerSection>
                <FeedItem item={item} navigation={navigation} />
              </>
            )
          return (
            <FeedItem
              item={item}
              last={index === sortedData.length - 1}
              navigation={navigation}
            />
          )
        }}
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

const ContainerSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`

const SectionTitle = styled.Text`
  color: ${props => (props.color ? props.color : 'black')};
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Separator = styled.View`
  height: 5px;
`

export default FeedScreen
