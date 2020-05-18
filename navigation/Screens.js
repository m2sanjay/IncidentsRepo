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
import Friends from "../screens/Friends";
import Results from "../screens/Results";
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

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

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

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Dashboard" optionLeft="Public" optionRight="Private" navigation={navigation} />
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
const FriendsStack = createStackNavigator(
  {
    Friends: {
      screen: Friends,
      navigationOptions: ({ navigation }) => ({
        header: <Header search title="Friends" pholder="Search for friends" navigation={navigation} />
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

const ResultsStack = createStackNavigator(
  {
    Results: {
      screen: Results,
      navigationOptions: ({ navigation }) => ({
        header: <Header search title="Results" pholder="Search for Results" navigation={navigation} />
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
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    WelcomeScreen1: {
      screen: WelcomeScreen1,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    WelcomeScreen2: {
      screen: WelcomeScreen2,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    WelcomeScreen3: {
      screen: WelcomeScreen3,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
    ,
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Dashboard" />
        )
      })
    },
    Friends: {
      screen: FriendsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Friends" />
        )
      })
    },
    Results: {
      screen: ResultsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Results" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Articles" title="Posts" />
        )
      })
    }
  },
  Menu
);
const TabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  ArticlesStack
});

TabNavigator.path = '';

//export default TabNavigator;
//const AppContainer = createAppContainer(TabNavigator);
//export default AppContainer;

const AppContainer = createAppContainer(AppStack);
//export {AppContainer, TabNavigator};
export {AppContainer};
