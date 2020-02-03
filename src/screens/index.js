import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import { Drawer, NavIcon } from '../components'
import { lightPrimaryColor, primaryColor } from '../resources'
import ContactScreen from './Contact'
import FaqScreen from './Faq'
import ForgotPasswordScreen from './Forgot'
import LoadingScreen from './Loading'
import MainScreen from './Main'
import NewsScreen from './News'
import NotificationScreen from './Notification'
import NotificationDetailScreen from './Notification/detail'
import ProfileScreen from './Profile'
import RegisterScreen from './Register'
import ScheduleScreen from './Schedule'
import SettingScreen from './Setting'
import SigninScreen from './Signin'
import SignupScreen from './Signup'
import TermScreen from './Term'
import TestScreen from './Test'
//import WelcomeScreen from './Welcome'

/**
 * Default Routes
 */
const MainRouteName = 'Auth' // options: App | Auth | AuthLoading | Test
const AuthRouteName = 'Signup'
const AuthDrawerRouteName = 'News'
const AppRouteName = 'News'
const AppDrawerRouteName = 'News'

const NotificationNavigator = createStackNavigator(
  {
    List: NotificationScreen,
    Detail: NotificationDetailScreen
  },
  {
    initialRouteName: 'List',
    headerMode: 'none'
  }
)

const BottomNavigator = createMaterialBottomTabNavigator(
  {
    Menu: {
      screen: MainScreen,
      navigationOptions: {
        tabBarOnPress: ({ navigation: { toggleDrawer } }) => toggleDrawer(),
        tabBarIcon: ({ focused }) => <NavIcon focused={focused} name="menu" />
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => <NavIcon focused={focused} name="home" />
      }
    },
    Registration: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: 'Register',
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="file-document-edit" />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="account-badge-horizontal" />
        )
      }
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="calendar-clock" />
        )
      }
    }
  },
  {
    initialRouteName: AppRouteName,
    activeColor: 'white',
    inactiveColor: lightPrimaryColor,
    barStyle: {
      backgroundColor: primaryColor
    },
    shifting: false
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    News: BottomNavigator,
    Notification: NotificationNavigator,
    Setting: SettingScreen,
    Contact: ContactScreen,
    Faq: FaqScreen,
    Term: TermScreen,
    Logout: () => <></>
  },
  {
    initialRouteName: AppDrawerRouteName,
    contentComponent: Drawer,
    drawerType: 'slide',
    backBehavior: 'initialRoute'
  }
)

/**
 * Auth
 */

const AuthLoginNavigator = createStackNavigator(
  {
    Signin: {
      screen: SigninScreen
    },
    Forgot: {
      screen: ForgotPasswordScreen
    }
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'none'
  }
)

const AuthBottomNavigator = createMaterialBottomTabNavigator(
  {
    Menu: {
      screen: MainScreen,
      navigationOptions: {
        tabBarOnPress: ({ navigation: { toggleDrawer } }) => toggleDrawer(),
        tabBarIcon: ({ focused }) => <NavIcon focused={focused} name="menu" />
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => <NavIcon focused={focused} name="school" />
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        tabBarLabel: 'Registration',
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="file-document-edit" />
        )
      }
    },
    Signin: {
      screen: AuthLoginNavigator,
      navigationOptions: {
        tabBarLabel: 'Login',
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="clipboard-account" />
        )
      }
    }
  },
  {
    initialRouteName: AuthRouteName,
    shifting: false,
    activeColor: 'white'
  }
)

const AuthDrawerNavigator = createDrawerNavigator(
  {
    News: AuthBottomNavigator,
    Contact: ContactScreen,
    Faq: FaqScreen,
    Term: TermScreen
  },
  {
    initialRouteName: AuthDrawerRouteName,
    contentComponent: Drawer,
    drawerType: 'slide'
  }
)

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthDrawerNavigator,
    AuthLoading: LoadingScreen,
    App: DrawerNavigator,
    Test: TestScreen
  },
  {
    initialRouteName: MainRouteName
  }
)

export default createAppContainer(AppNavigator)
