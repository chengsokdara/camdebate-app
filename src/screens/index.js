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
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import { Drawer, NavIcon } from '../components'
import { lightPrimaryColor, primaryColor } from '../resources'
import ApplicationScreen from './Application'
import ContactScreen from './Contact'
import FaqScreen from './Faq'
import FeedScreen from './Feed'
import ForgotPasswordScreen from './Forgot'
import MainScreen from './Main'
import MaintenanceScreen from './Maintenance'
import NotificationScreen from './Notification'
import NotificationDetailScreen from './Notification/detail'
import PaymentScreen from './Payment'
import ProfileScreen from './Profile'
import ScheduleScreen from './Schedule'
import SettingScreen from './Setting'
import SigninScreen from './Signin'
import SignupScreen from './Signup'
import TermScreen from './Term'
import TestScreen from './Test'
import WebScreen from './Web'
//import WelcomeScreen from './Welcome'

const MainRouteName = 'Main' // options: App | Auth | Main | Test
const AuthRouteName = 'Feed'
const AuthDrawerRouteName = 'Feed'
const AppRouteName = 'Feed'
const AppDrawerRouteName = 'Feed'

const ApplicationNavigator = createSwitchNavigator(
  {
    Application: ApplicationScreen,
    Payment: PaymentScreen
  },
  {
    initialRouteName: 'Application'
  }
)

const FeedNavigator = createStackNavigator(
  {
    Feed: FeedScreen,
    Web: WebScreen
  },
  {
    initialRouteName: 'Feed',
    headerMode: 'none'
  }
)

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
      screen: () => null,
      navigationOptions: {
        tabBarOnPress: ({ navigation: { toggleDrawer } }) => toggleDrawer(),
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="backburger" />
        )
      }
    },
    Feed: {
      screen: FeedNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="bulletin-board" />
        )
      }
    },
    Application: {
      screen: ApplicationNavigator,
      navigationOptions: {
        tabBarLabel: 'Application',
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
    Feed: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="bulletin-board" />
        )
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="cogs" />
        )
      }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="phone-in-talk" />
        )
      }
    },
    Faq: {
      screen: FaqScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon
            color={tintColor}
            focused={focused}
            name="help-circle-outline"
          />
        )
      }
    },
    Term: {
      screen: TermScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon
            color={tintColor}
            focused={focused}
            name="file-table-outline"
          />
        )
      }
    },
    Notification: {
      screen: NotificationNavigator,
      navigationOptions: { drawerLabel: () => null }
    },
    Browser: {
      screen: WebScreen,
      navigationOptions: { drawerLabel: () => null }
    },
    Logout: {
      screen: () => null,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="logout-variant" />
        )
      }
    }
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
      screen: () => null,
      navigationOptions: {
        tabBarOnPress: ({ navigation: { toggleDrawer } }) => toggleDrawer(),
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="backburger" />
        )
      }
    },
    Feed: {
      screen: FeedNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name="bulletin-board" />
        )
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
          <NavIcon focused={focused} name="shield-account" />
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
    Feed: {
      screen: AuthBottomNavigator,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="bulletin-board" />
        )
      }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon color={tintColor} focused={focused} name="phone-in-talk" />
        )
      }
    },
    Faq: {
      screen: FaqScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon
            color={tintColor}
            focused={focused}
            name="help-circle-outline"
          />
        )
      }
    },
    Term: {
      screen: TermScreen,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon
            color={tintColor}
            focused={focused}
            name="file-table-outline"
          />
        )
      }
    },
    Browser: {
      screen: WebScreen,
      navigationOptions: { drawerLabel: () => null }
    },
    Exit: {
      screen: () => null,
      navigationOptions: {
        drawerIcon: ({ focused, tintColor }) => (
          <NavIcon
            color={tintColor}
            focused={focused}
            name="close-circle-outline"
          />
        )
      }
    }
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
    Main: MainScreen,
    App: DrawerNavigator,
    Maintenance: MaintenanceScreen,
    Test: TestScreen
  },
  {
    initialRouteName: MainRouteName
  }
)

export default createAppContainer(AppNavigator)
