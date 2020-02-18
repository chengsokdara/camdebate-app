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
import styled from 'styled-components'
import { Caption, Card as PaperCard } from 'react-native-paper'

import { AppBar } from '../../components'
import { primaryColor } from '../../resources'
import { MockFaq } from '../../resources/mocks'
import { Linking } from 'react-native'

const ContactScreen = ({ navigation }) => {
  return (
    <Container>
      <AppBar backable onBackPress={() => navigation.goBack()} />
      <Content>
        {MockFaq.map(({ email, facebook, phone, title }, index) => (
          <Card key={index}>
            <Card.Title title={title} />
            <CardContent>
              <Left>
                <Text>Email:</Text>
                <Text>Facebook:</Text>
                <Text>Phone:</Text>
              </Left>
              <Right>
                <Link
                  color={primaryColor}
                  onPress={() => Linking.openURL(`mailto:${email}`)}>
                  {email}
                </Link>
                <Link
                  color={primaryColor}
                  onPress={() => Linking.openURL(facebook.link)}>
                  {facebook.label}
                </Link>
                {phone.map((p, i) => (
                  <Link
                    key={i}
                    color={primaryColor}
                    onPress={() => Linking.openURL(`tel:${p}`)}>
                    {p}
                  </Link>
                ))}
              </Right>
            </CardContent>
          </Card>
        ))}
        <Caption>
          For Frequently Asked Questions, click{' '}
          <Link color={primaryColor} onPress={() => navigation.navigate('Faq')}>
            HERE
          </Link>
        </Caption>
      </Content>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const CardContent = styled(Card.Content)`
  flex-direction: row;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
  padding: 10px;
`

const Left = styled.View`
  width: 80px;
`

const Link = styled.Text`
  font-size: 15px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
`

const Right = styled.View`
  flex: 1;
`

const Text = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`

export default ContactScreen
