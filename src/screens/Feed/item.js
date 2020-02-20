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
import { Button, Card as PaperCard, List } from 'react-native-paper'

import { primaryColor } from '../../resources'
import { formatString } from '../../service'

const FeedItem = ({ item, last, navigation }) => {
  const {
    ListData,
    ListTitle,
    Message,
    Note,
    NoteUrl,
    SubTitle,
    TableData,
    Title
  } = item
  //console.log('NewsFeedItem', item)

  const ListDataJson = ListData ? JSON.parse(ListData) : null
  //console.log('ListDataJson', ListDataJson)

  const TableDataJson = TableData ? JSON.parse(TableData) : null
  //console.log('TableDataJson', TableDataJson)

  const renderNote = (Note, NoteUrl) => {
    //console.log('Note', Note)
    if (Note.includes('{{') && Note.includes('}}')) {
      const start = Note.lastIndexOf('{{')
      const end = Note.lastIndexOf('}}')
      const buttonLabel = Note.substring(start + 2, end)
      //console.log('buttonLabel', buttonLabel)
      return (
        <>
          <CardMessage>{Note.substring(0, start - 1)}</CardMessage>
          <ButtonContained
            mode="contained"
            contentStyle={{
              height: 50,
              paddingHorizontal: 10
            }}
            onPress={() => navigation.navigate('Web', { uri: NoteUrl })}>
            {buttonLabel}
          </ButtonContained>
        </>
      )
    }
    if (Note.includes('{') && Note.includes('}')) {
      const start = Note.lastIndexOf('{')
      const end = Note.lastIndexOf('}')
      const startNote = Note.substring(0, start)
      const endNote = Note.substring(end + 1, Note.length)
      const buttonLabel = Note.substring(start + 1, end)
      //console.log('buttonLabel', buttonLabel)
      return (
        <CardMessage>
          {startNote || ''}
          <Link
            color={primaryColor}
            onPress={() => navigation.navigate('Web', { uri: NoteUrl })}>
            {buttonLabel}
          </Link>
          {endNote || ''}
        </CardMessage>
      )
    }
    return null
  }

  return (
    <Container>
      <Card last={last}>
        <CardContent>
          {Title ? <CardTitle>{Title}</CardTitle> : null}
          {SubTitle ? <CardSubTitle>{SubTitle}</CardSubTitle> : null}
          {Message ? <CardMessage>{formatString(Message)}</CardMessage> : null}
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
          {Note ? renderNote(Note, NoteUrl) : null}
        </CardContent>
      </Card>
    </Container>
  )
}

const ButtonContained = styled(Button)`
  margin-top: 10px;
`

const Card = styled(PaperCard)`
  margin-top: 5px;
  margin-bottom: ${props => (props.last ? '10px' : '5px')};
  margin-left: 10px;
  margin-right: 10px;
`

const CardContent = styled(PaperCard.Content)`
  padding: 20px;
`

const CardMessage = styled.Text`
  color: #757575;
  font-size: 16px;
  margin-top: 20px;
`

const CardSubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #757575;
  margin-top: 5px;
`

const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

const Container = styled.View`
  border-radius: 10px;
`

const Link = styled.Text`
  font-size: 16px;
  color: ${props => props.color};
`

const ListContainer = styled.View`
  margin-top: 20px;
`

const ListText = styled.Text`
  color: #757575;
  font-size: 16px;
  font-weight: bold;
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
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-top: 20px;
`

const TableText = styled.Text`
  color: #757575;
  font-size: 16px;
  padding: 10px;
`

export default FeedItem
