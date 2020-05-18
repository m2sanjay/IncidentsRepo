
import React from "react";
import { Easing, Animated , Platform} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import { WelcomeScreen1, WelcomeScreen2, WelcomeScreen3 } from "../screens/WelcomeScreens";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Icon from '../components/Icon';
import argonTheme from '../constants/Theme';
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
{
  screen: Home,
},
{
    config,
    headerMode: 'none'
}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <Icon
      family="ArgonExtra"
      size={16}
      name="calendar-date"
      color={argonTheme.COLORS.ICON}
    />
  ),
  header: (
    <Header white transparent title="Profile" iconColor={'#FFF'} />
  )
};

const ProfileStack = createStackNavigator(
    {
      screen: Profile,
    },
    {
      config,
      headerMode: 'none'
    }
  );
  ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <Icon
        family="ArgonExtra"
        size={16}
        name="palette"
        color={argonTheme.COLORS.ICON}
      />
    ),
  };

  const ArticlesStack = createStackNavigator(
    {
      screen: Articles,
  },{
    config,
    headerMode: 'none'
  });
  ArticlesStack.navigationOptions = {
    tabBarLabel: 'Post',
    tabBarIcon: ({ focused }) => (
      <Icon
        family="ArgonExtra"
        size={16}
        name="spaceship"
        color={argonTheme.COLORS.ICON}
      />
    ),
  };



const TabNavigator = createBottomTabNavigator({
    HomeStack,
    ProfileStack,
    ArticlesStack
  });
  
  TabNavigator.path = '';
  
  export default TabNavigator;