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
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Button, Snackbar } from 'react-native-paper'
import { DrawerItems } from 'react-navigation-drawer'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import { primaryColor } from '../../resources'
import { MenusQuery } from '../../resources/queries'
import { logoutAsync } from '../../service'
import DrawerItem from './item'

const MOCK_DRAWER_ITEMS = [
  {
    MenuID: 1,
    Title: 'Login',
    Url: 'https://www.google.com',
    Screen: 'Signin',
    Visible: true,
    Deleted: false
  },
  {
    MenuID: 2,
    Title: 'Hello 2',
    Url: 'https://www.google.com',
    Visible: true,
    Deleted: false
  },
  {
    MenuID: 3,
    Title: 'Hello 3',
    Url: 'https://www.google.com',
    Visible: true,
    Deleted: false
  },
  {
    MenuID: 4,
    Title: 'Hello 4',
    Url: 'https://www.google.com',
    Visible: false,
    Deleted: true
  },
  {
    MenuID: 5,
    Title: 'Hello 5',
    Url: 'https://www.google.com',
    Visible: false,
    Deleted: false
  },
  {
    MenuID: 6,
    Title: 'Hello 6',
    Url: 'https://www.google.com',
    Visible: true,
    Deleted: false
  },
  {
    MenuID: 7,
    Title: 'Hello 7',
    Url: 'https://www.google.com',
    Visible: true,
    Deleted: false
  }
]

const Drawer = props => {
  const dispatch = useDispatch()
  const { navigation } = props
  const [toggleSnackbar, setToggleSnackbar] = useState('')
  const { token, profile } = useSelector(state => state.auth, shallowEqual)
  const { data: MenuItems, error, loading } = useQuery(MenusQuery)

  console.log('props', props)

  console.log('ProfileScreen profile', profile)
  console.log('ProfileScreen MenuItems', MenuItems)

  const handleLogoutPress = async () => {
    const loggedOut = await dispatch(logoutAsync())
    console.log('Logged out', loggedOut)
    if (!loggedOut) navigation.navigate('Main')
    else setToggleSnackbar('There are some errors!')
  }

  return (
    <SafeArea forceInset={{ top: 'always', horizontal: 'never' }}>
      <Container onPress={() => navigation.closeDrawer()} activeOpacity={1}>
        {token ? (
          <Header>
            <Avatar
              source={require('../../resources/images/camdebate_white_logo.png')}
            />
            {profile ? (
              <UserInfoContainer>
                <TextName>{`${profile.Title}. ${profile.GivenName}`}</TextName>
                <Text>{profile.Phone}</Text>
                {profile.WorkPlace ? <Text>{profile.WorkPlace}</Text> : null}
              </UserInfoContainer>
            ) : (
              <UserInfoContainer>
                <TextName>CamDEBATE App</TextName>
                <Button
                  mode="contained"
                  style={{ alignSelf: 'baseline' }}
                  onPress={() => navigation.navigate('Signin')}>
                  Login
                </Button>
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
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <TextSection>Navigation</TextSection>
          <DrawerItems
            {...props}
            onItemPress={({ route, focused }) => {
              if (route.routeName === 'Logout') handleLogoutPress()
              else props.onItemPress({ route, focused })
            }}
          />
          <TextSection>Menu</TextSection>
          {MenuItems && MenuItems.menus.code === 200
            ? MenuItems.menus.menus
                .sort((a, b) => b.Order > a.Order)
                .map(item =>
                  item.Visible && !item.Deleted && (!item.Screen || profile) ? (
                    <DrawerItem
                      key={item.MenuID}
                      title={item.Title}
                      onPress={() =>
                        item.Screen
                          ? navigation.navigate(item.Screen)
                          : navigation.navigate('Browser', { uri: item.Url })
                      }
                    />
                  ) : null
                )
            : null}
        </Content>
        <Footer>
          <Text bold color={primaryColor}>
            Hosted By
          </Text>
          <LogoIDP source={require('../../resources/images/idp_logo.png')} />
          <Text>All right reserved.</Text>
        </Footer>
      </Container>
      <Snackbar
        duration={5000}
        visible={toggleSnackbar}
        onDismiss={() => setToggleSnackbar('')}
        action={{
          label: 'Done',
          onPress: () => setToggleSnackbar('')
        }}>
        {toggleSnackbar || 'Unknown errors!'}
      </Snackbar>
    </SafeArea>
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

const Content = styled.ScrollView`
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

const TextSection = styled.Text`
  color: #fafafa;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${primaryColor};
`

const UserInfoContainer = styled.View`
  flex: 1;
  justify-content: center;
`

export default Drawer
