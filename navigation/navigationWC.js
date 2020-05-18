
import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import {WelcomeScreen1, WelcomeScreen2, WelcomeScreen3} from "../screens/WelcomeScreens";


export default WelcomeScreenStack = createStackNavigator({
    WelcomeScreen1: {
        screen: WelcomeScreen1,
        navigationOptions: {
            header: null
        }
    },
  
    WelcomeScreen2: {
        screen: WelcomeScreen2,
        navigationOptions: {
            header: null
        }
    },
    WelcomeScreen3: {
        screen: WelcomeScreen3,
        navigationOptions: {
            headerTitle: null
        }
    }
  });