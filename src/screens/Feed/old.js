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
/*
import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useQuery } from '@apollo/react-hooks'
import { Linking } from 'react-native'
import { Button, Caption, Card as PaperCard, List } from 'react-native-paper'
import { WebView } from 'react-native-webview'
import { useSelector, shallowEqual } from 'react-redux'

import { primaryColor } from '../../resources'
import { MockNews } from '../../resources/mocks'
import { NewsFeedQuery } from '../../resources/queries'
import { AppBar } from '../../components'

const NewsScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(NewsFeedQuery)
  const { token } = useSelector(state => state.auth, shallowEqual)

  if (loading) console.log('GraphQL loading...')
  if (error) console.log('GaphQL error!', error)
  console.log('GraphQL data', data)

  const renderSectionAnnouncement = items => {
    const { button, content, link, list, notice, title } = items
    return !token ? (
      <ContainerAnnouncement key="announcement">
        <ContainerSection>
          <Icon name="bullhorn" size={22} color={primaryColor} />
          <SectionTitle color={primaryColor}>ANNOUNCEMENT</SectionTitle>
        </ContainerSection>
        <Card>
          <NewsTitle title={title} />
          <Card.Content>
            <Text>{content}</Text>
            {list.map((item, index) => (
              <List.Item
                key={index}
                title={item}
                titleNumberOfLines={2}
                left={() => (
                  <Icon
                    name="circle-medium"
                    size={12}
                    color="black"
                    style={{ alignSelf: 'center' }}
                  />
                )}
              />
            ))}
            <Button
              mode="contained"
              contentStyle={{
                height: 50,
                paddingHorizontal: 10
              }}
              onPress={() => navigation.navigate('Signup')}>
              {button}
            </Button>
            <Caption style={{ marginTop: 10 }}>
              {notice}
              <Link
                color={primaryColor}
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL(link)}>
                HERE
              </Link>
            </Caption>
          </Card.Content>
        </Card>
      </ContainerAnnouncement>
    ) : null
  }

  const renderSectionNews = (item, index) => {
    const { content, subtitle, table, title } = item
    return (
      <ContainerNews key="news">
        <ContainerSection>
          <Icon name="newspaper" size={22} color={primaryColor} />
          <SectionTitle color={primaryColor}>NEWS</SectionTitle>
        </ContainerSection>
        <Card key={index}>
          <NewsTitle title={title} subtitle={subtitle} />
          <Card.Content>
            <Text>{content}</Text>
            {table ? <Web source={{ html: table }} /> : null}
          </Card.Content>
        </Card>
      </ContainerNews>
    )
  }

  const renderNews = (item, index) => {
    const { content, subtitle, table, title } = item
    return (
      <Card key={index} lastChild={index === MockNews.length - 1}>
        <NewsTitle title={title} subtitle={subtitle} />
        <Card.Content>
          <Text>{content}</Text>
          {table ? <Web source={{ html: table }} /> : null}
        </Card.Content>
      </Card>
    )
  }

  return (
    <Container>
      {token ? (
        <AppBar onNotiPress={() => navigation.navigate('Notification')} />
      ) : (
        <AppBar />
      )}
      <Scroll contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        {MockNews.map((item, index) =>
          index === 0
            ? renderSectionAnnouncement(item)
            : index === 1
            ? renderSectionNews(item, index)
            : renderNews(item, index)
        )}
      </Scroll>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const ContainerAnnouncement = styled.View``

const ContainerNews = styled.View``

const ContainerSection = styled.View`
  flex-direction: row;
  align-items: center;
`

const Card = styled(PaperCard)`
  margin-bottom: ${props => (props.lastChild ? 0 : '10px')};
`

const Link = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
`

const NewsTitle = styled(Card.Title)`
  font-size: 16px;
`

const SectionTitle = styled.Text`
  color: ${props => (props.color ? props.color : 'black')};
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Scroll = styled.ScrollView``

const Text = styled.Text`
  font-size: 14px;
`

const Web = styled(WebView)`
  height: 1100px;
`

export default NewsScreen
 */
