import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class WelcomeScreen1 extends React.Component {
  render() {
    const { navigation } = this.props;
    var cards = [];



    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title} center>
                <Block center>
                  <Text color="white" size={30}>
                  Compare Anything
                  </Text>
                </Block>
                <Block style={styles.subTitle} center>
                  <Text center color="white" size={16}>
                  Compare anything fashion, celebrities, humor, or whatever your heart desires.
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color="primary"
                  onPress={() => navigation.navigate("WelcomeScreen2")}
                  textStyle={{  color: argonTheme.COLORS.WHITE }}
                >
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}> Next </Text>
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
class WelcomeScreen2 extends React.Component {
  render() {
    const { navigation } = this.props;
    var cards = [];



    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title} center>
                <Block center>
                  <Text color="white" size={30}>
                  Private conversations
                  </Text>
                </Block>
                <Block style={styles.subTitle} center>
                  <Text center color="white" size={16}>
                  Send private cards and messages to your friends.
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color="primary"
                  onPress={() => navigation.navigate("WelcomeScreen3")}
                  textStyle={{  color: argonTheme.COLORS.WHITE }}
                >
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}> Next </Text>
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
class WelcomeScreen3 extends React.Component {
  render() {
    const { navigation } = this.props;
    var cards = [];



    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title} center>
                <Block center>
                  <Text color="white" size={30}>
                  Get featured
                  </Text>
                </Block>
                <Block style={styles.subTitle} center>
                  <Text center color="white" size={16}>
                  Create something awesome to get featured in the Community Feed or Daily Dozen!.
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color="primary"
                  onPress={() => navigation.navigate("Account")}
                  textStyle={{  color: argonTheme.COLORS.WHITE }}
                >
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}> Go To App </Text>
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width * 0.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  logo: {
    width: 200,
    height: 200,
    zIndex: 2,
    position: 'relative',
    marginTop: '-80%'
  },
  title: {
    marginTop:'-25%'
  },
  subTitle: {
    marginTop: 20
  }
});

export { WelcomeScreen1, WelcomeScreen2, WelcomeScreen3 };
