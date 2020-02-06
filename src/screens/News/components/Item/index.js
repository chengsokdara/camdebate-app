import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Button,
  Caption,
  Card as PaperCard,
  DataTable as PaperTable,
  List,
  TouchableRipple
} from 'react-native-paper'
import { WebView } from 'react-native-webview'

import { formatString } from '../../../../service'

const NewsFeedItem = ({ item }) => {
  const { ListData, ListTitle, Message, SubTitle, TableData, Title } = item
  //console.log('NewsFeedItem', item)

  const ListDataJson = ListData ? JSON.parse(ListData) : null
  //console.log('ListDataJson', ListDataJson)

  const TableDataJson = TableData ? JSON.parse(TableData) : null
  //console.log('TableDataJson', TableDataJson)

  return (
    <Container borderless onPress={() => {}}>
      <Card>
        <CardContent>
          <CardTitle
            title={Title}
            subtitle={SubTitle}
            titleStyle={{ fontSize: 24 }}
          />
          {Message ? <TextMessage>{formatString(Message)}</TextMessage> : null}
          {TableDataJson
            ? TableDataJson.map((table, index) => (
                <TableRow key={index}>
                  {Object.entries(table).map(([key, value], index) => (
                    <TableColumn key={index}>
                      <TableHeader first={index === 0}>{key}</TableHeader>
                      <TableText>{value}</TableText>
                    </TableColumn>
                  ))}
                </TableRow>
              ))
            : null}
          {ListDataJson
            ? ListDataJson.map((listText, index) => (
                <ListContainer key={index}>
                  {ListTitle ? (
                    <List.Subheader>{ListTitle}</List.Subheader>
                  ) : null}
                  <ListText>{`\u2022${'  '}${listText}`}</ListText>
                </ListContainer>
              ))
            : null}
        </CardContent>
      </Card>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin: 5px;
`

const CardContent = styled(PaperCard.Content)`
  padding: 0;
`

const CardTitle = styled(PaperCard.Title)`
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`

const Container = styled(TouchableRipple)`
  border-radius: 10px;
`

const ListContainer = styled.View`
  padding: 0;
  margin: 0;
`

const ListText = styled.Text`
  color: #757575;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
`

const TableColumn = styled.View``

const TableHeader = styled.Text`
  font-size: 16px;
  font-weight: bold;
  background-color: #eeeeee;
  color: #757575;
  border-top-left-radius: ${props => (props && props.first ? '9px' : '0')};
  border-top-right-radius: ${props => (props && props.first ? '9px' : '0')};
  padding: 10px;
`

const TableRow = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
`

const TableText = styled.Text`
  color: #757575;
  font-size: 16px;
  padding: 10px;
`

const Text = styled.Text`
  font-size: 14px;
`

const TextMessage = styled.Text`
  color: #757575;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`

const ContainerSection = styled.View`
  flex-direction: row;
  align-items: center;
`

const Link = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
`

const SectionTitle = styled.Text`
  color: ${props => (props.color ? props.color : 'black')};
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export default NewsFeedItem

/*
<Scroll contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
  {MockNews.map((item, index) =>
    index === 0
      ? renderSectionAnnouncement(item)
      : index === 1
      ? renderSectionNews(item, index)
      : renderNews(item, index)
  )}
</Scroll>
*/

/*
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
*/
