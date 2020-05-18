import React from "react";
import { Easing, Animated , Platform} from "react-native";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Block } from "galio-framework";



import Home from "../screens/Home";
import { WelcomeScreen1, WelcomeScreen2, WelcomeScreen3 } from "../screens/WelcomeScreens";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Articles from "../screens/Articles";
import Icon from '../components/Icon';
import argonTheme from '../constants/Theme';
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

// const CustomTabNavigator = createMaterialTopTabNavigator(
//   {
//     Profile: {
//       navigationOptions: {
//         tabBarLabel: "Profile"
//       },
//       screen: Profile
//     },
//     Articles: {
//       navigationOptions: {
//         tabBarLabel: "Posts"
//       },
//       screen: Articles
//     }
//   },
//   {
//     tabBarPosition: "bottom"
//   }
// );

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });
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
  
  
  const ProfileStack = createStackNavigator(
      {
        screen: Profile,
        // Profile: {
        //   screen: Profile,
        //   navigationOptions: ({ navigation }) => ({
        //     header: (
        //       <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        //     ),
        //     headerTransparent: true
        //   })
        // }
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
      // Articles: {
      //   screen: Articles,
      //   navigationOptions: ({ navigation }) => ({
      //     header: <Header search title="Posts" navigation={navigation} />
      //   })
      // }
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
  
  
  
  const tabNavigator = createBottomTabNavigator({
      ProfileStack,
      ArticlesStack
    });
    
    tabNavigator.path = '';
    
    export default tabNavigator;

//export default CustomTabNavigator;
