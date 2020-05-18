
import React from "react";
import { Easing, Animated } from "react-native";
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
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
  
      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1]
      });
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });
  
      const scaleWithOpacity = { opacity };
      const screenName = "Search";
  
      if (
        screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps &&
          screenName === prevTransitionProps.scene.route.routeName)
      ) {
        return scaleWithOpacity;
      }
      return { transform: [{ translateX }] };
    }
  });
const HomeStack = createStackNavigator(
{
    Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Dashboard" optionLeft="Public" optionRight="Private" navigation={navigation} />
    })
    },
    Pro: {
    screen: Pro,
    navigationOptions: ({ navigation }) => ({
        header: (
        <Header left={<Block />} white transparent title=""  optionLeft="Public" optionRight="Private" navigation={navigation} />
        ),
        headerTransparent: true
    })
    }
},
{
    cardStyle: {
    backgroundColor: "#F8F9FE"
    },
    transitionConfig
}
);

const ProfileStack = createStackNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          header: (
            <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
          ),
          headerTransparent: true
        })
      }
    },
    {
      cardStyle: { backgroundColor: "#FFFFFF" },
      transitionConfig
    }
  );

  const ArticlesStack = createStackNavigator({
    Articles: {
      screen: Articles,
      navigationOptions: ({ navigation }) => ({
        header: <Header search title="Posts" navigation={navigation} />
      })
    }
  },{
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  });



const tabNavigator = createBottomTabNavigator({
    HomeStack,
    ProfileStack,
    ArticlesStack
  });
  
  tabNavigator.path = '';
  
  export default tabNavigator;