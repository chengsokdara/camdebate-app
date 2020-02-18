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
import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
//import { useLazyQuery } from '@apollo/react-hooks'

import { primaryColor } from '../../resources'
//import { ProfileQuery } from '../../resources/queries'
import { logoutAsync } from '../../service'

const Drawer = props => {
  const dispatch = useDispatch()
  const { navigation } = props
  const { token, profile } = useSelector(state => state.auth, shallowEqual)
  /* const [getProfile, { called, data, error, loading }] = useLazyQuery(
    ProfileQuery
  ) */

  //if (loading) console.log('Loading...')
  //if (error) console.log('Error', error)

  console.log('ProfileScreen profile', profile)

  const handleLogoutPress = async () => {
    const loggedOut = await dispatch(logoutAsync())
    console.log('Logged out', !loggedOut)
    if (!loggedOut) navigation.navigate('AuthLoading')
  }

  /* useEffect(() => {
    if (!called && token) getProfile()
  }, [token]) */

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeArea forceInset={{ top: 'always', horizontal: 'never' }}>
        <Container onPress={() => navigation.closeDrawer()} activeOpacity={1}>
          {token ? (
            <Header>
              <Avatar
                source={require('../../resources/images/camdebate_white_logo.png')}
              />
              {profile ? (
                <UserInfoContainer>
                  <TextName>
                    {`${profile.Title}. ${profile.GivenName}`}
                  </TextName>
                  <Text>{profile.Phone}</Text>
                  {profile.WorkPlace ? <Text>{profile.WorkPlace}</Text> : null}
                </UserInfoContainer>
              ) : (
                <UserInfoContainer>
                  <TextName>
                    {`${profile.Title}. ${profile.GivenName}`}
                  </TextName>
                  <Text>{profile.Phone}</Text>
                  {<Text>{profile.WorkPlace}</Text>}
                </UserInfoContainer>
              )}
            </Header>
          ) : (
            <Header>
              <Logo
                source={require('../../resources/images/camdebate_logo.png')}
              />
              <AppInfoContainer>
                <TextAppName>CamDEBATE</TextAppName>
                <TextAppName>App</TextAppName>
              </AppInfoContainer>
            </Header>
          )}
          <Content>
            <DrawerItems
              {...props}
              onItemPress={({ route, focused }) => {
                if (route.routeName === 'Logout') handleLogoutPress()
                else props.onItemPress({ route, focused })
              }}
            />
          </Content>
          <Footer>
            <Text bold color={primaryColor}>
              Hosted By
            </Text>
            <LogoIDP source={require('../../resources/images/idp_logo.png')} />
            <Text>All right reserved.</Text>
          </Footer>
        </Container>
      </SafeArea>
    </ScrollView>
  )
}

const AppInfoContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
`

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: blue;
  margin: 10px;
`

const Container = styled.TouchableOpacity`
  flex: 1;
`

const Content = styled.View`
  flex: 1;
`

const Footer = styled.View`
  align-items: center;
  padding: 10px;
`

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Logo = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: 10px;
  margin-left: 5px;
`

const LogoIDP = styled.Image`
  width: 160px;
  height: 60px;
  margin-bottom: 10px;
`

const SafeArea = styled.SafeAreaView`
  flex: 1;
`

const Text = styled.Text`
  font-size: 14px;
  font-weight: ${props => (props && props.bold ? 'bold' : 'normal')};
  color: ${props => (props && props.color ? props.color : 'black')};
`

const TextAppName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

const TextName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
`

const UserInfoContainer = styled.View`
  flex: 1;
  justify-content: center;
`

export default Drawer
