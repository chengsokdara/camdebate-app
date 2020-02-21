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
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Caption, Snackbar } from 'react-native-paper'
import { useSelector, shallowEqual } from 'react-redux'

import { AppBar } from '../../components'
import { primaryColor } from '../../resources'
import { MockRegistration } from '../../resources/mocks'
import ApplicationForm from './form'

const ApplicationScreen = ({ navigation }) => {
  const { content, link, notice, title } = MockRegistration

  const [toggleSnackbar, setToggleSnackbar] = useState('')
  const { profile } = useSelector(state => state.auth, shallowEqual)

  useEffect(() => {
    if (profile && profile.Paid) navigation.navigate('Payment')
  }, [profile])

  return (
    <Container>
      <AppBar
        onLogoPress={() => navigation.openDrawer()}
        onNotiPress={() => navigation.navigate('Notification')}
      />
      <Content
        enableOnAndroid
        extraScrollHeight={200}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10
        }}>
        <ApplicationForm
          content={content}
          profile={profile}
          title={title}
          setToggleSnackbar={setToggleSnackbar}
          onRegistred={() => navigation.navigate('Payment')}
        />
        <Footer>
          <Caption style={{ marginTop: 10 }}>
            {notice}
            <Link
              color={primaryColor}
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL(`mailto:${link}`)}>
              {link}
            </Link>
          </Caption>
        </Footer>
      </Content>
      <Snackbar
        duration={5000}
        visible={toggleSnackbar}
        onDismiss={() => setToggleSnackbar('')}
        action={{
          label: 'Done',
          onPress: () => setToggleSnackbar('')
        }}>
        {toggleSnackbar || 'Application registered!'}
      </Snackbar>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`

const Content = styled(KeyboardAwareScrollView)``

const Footer = styled.View`
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
`

const Link = styled.Text`
  font-size: 12px;
  color: ${props => props.color};
  margin-left: 5px;
  margin-right: 5px;
  padding-left: 5px;
`

export default ApplicationScreen
