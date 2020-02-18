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
import { Linking } from 'react-native'
import { Button, Caption, Card as PaperCard, List } from 'react-native-paper'

import { primaryColor } from '../../resources'
import { MockRegistration } from '../../resources/mocks'
import { AppBar } from '../../components'

const WelcomeScreen = ({ navigation }) => {
  const { button, content, link, list, notice } = MockRegistration
  return (
    <Container>
      <AppBar />
      <Content>
        <Card>
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
          </Card.Content>
        </Card>
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
      </Content>
    </Container>
  )
}

const Card = styled(PaperCard)`
  margin-bottom: 10px;
`

const Container = styled.View`
  flex: 1;
`

const Content = styled.View`
  padding: 20px;
`

const Link = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
`

const Text = styled.Text`
  font-size: 16px;
`

export default WelcomeScreen
