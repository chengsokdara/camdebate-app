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
import React, { memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import { BackHandler } from 'react-native'
import { Button, Snackbar } from 'react-native-paper'
import { DrawerItems } from 'react-navigation-drawer'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import { primaryColor } from '../../resources'
//import { MockDrawerItems } from '../../resources/mocks'
import { MenusQuery } from '../../resources/queries'
import { logoutAsync } from '../../service'
import DrawerItem from './item'

const Drawer = props => {
  const dispatch = useDispatch()
  const { navigation } = props
  const [menuItems, setMenuItems] = useState([])
  const [toggleSnackbar, setToggleSnackbar] = useState('')
  const { token, profile } = useSelector(state => state.auth, shallowEqual)
  const { data, error, loading } = useQuery(MenusQuery)

  console.log('props', props)

  console.log('ProfileScreen data', data)
  console.log('ProfileScreen profile', profile)

  const handleLogoutPress = async () => {
    const loggedOut = await dispatch(logoutAsync())
    console.log('Logged out', loggedOut)
    if (!loggedOut) navigation.navigate('Main')
    else setToggleSnackbar('There are some errors!')
  }

  // Handle drawer menu items change
  useEffect(() => {
    if (!loading && !error && data) {
      const { code, menus } = data.menus
      const sortedMenus = menus.sort((a, b) => a.Order > b.Order)
      if (code === 200) setMenuItems(sortedMenus)
    }
  }, [error, loading, data])

  return (
    <SafeArea forceInset={{ top: 'always', horizontal: 'never' }}>
      <Container onPress={() => navigation.closeDrawer()} activeOpacity={1}>
        {useMemo(
          () =>
            token ? (
              <Header>
                <Avatar
                  source={require('../../resources/images/camdebate_white_logo.png')}
                />
                {useMemo(
                  () =>
                    profile ? (
                      <UserInfoContainer>
                        <TextName>{`${profile.Title} ${profile.GivenName}`}</TextName>
                        <Text>{profile.Phone}</Text>
                        <Text>{profile.WorkPlace}</Text>
                      </UserInfoContainer>
                    ) : null,
                  [profile]
                )}
              </Header>
            ) : (
              <Header>
                <Logo
                  source={require('../../resources/images/camdebate_logo.png')}
                />
                <AppInfoContainer>
                  <TextName>CamDEBATE</TextName>
                  <Button
                    icon="shield-account-outline"
                    mode="contained"
                    style={{ alignSelf: 'baseline' }}
                    onPress={() => navigation.navigate('Signin')}>
                    Login
                  </Button>
                </AppInfoContainer>
              </Header>
            ),
          [profile, token]
        )}
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          {useMemo(
            () => (
              <DrawerItems
                {...props}
                onItemPress={({ route, focused }) => {
                  if (route.routeName === 'Logout') handleLogoutPress()
                  else if (route.routeName === 'Exit') BackHandler.exitApp()
                  else props.onItemPress({ route, focused })
                }}
              />
            ),
            [props]
          )}
          <Divider />
          {useMemo(
            () =>
              menuItems.length > 0
                ? menuItems.map(item =>
                    item.Visible && !item.Deleted && (!item.Screen || token) ? (
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
                : null,
            [menuItems, token]
          )}
        </Content>
        <Footer>
          <Text bold color={primaryColor}>
            Hosted By
          </Text>
          <LogoIDP source={require('../../resources/images/idp_logo.png')} />
          <Text>All right reserved.</Text>
        </Footer>
      </Container>
      {useMemo(
        () => (
          <Snackbar
            duration={5000}
            visible={toggleSnackbar}
            onDismiss={() => setToggleSnackbar('')}
            action={{
              label: 'Done',
              onPress: () => setToggleSnackbar('')
            }}>
            {toggleSnackbar || 'Unknown Errors!'}
          </Snackbar>
        ),
        [toggleSnackbar]
      )}
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

const Divider = styled.View`
  height: 1px;
  background-color: #d5d5d5;
  margin-top: 2px;
  margin-bottom: 2px;
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

export default memo(Drawer)
