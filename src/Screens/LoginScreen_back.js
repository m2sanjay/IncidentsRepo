import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class LoginScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        <StatusBar hidden />
        {/* <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        > */}
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color={'#00c5e8'} size={12}> Login with </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE, marginLeft: 25 }}>
                  <Button style={{...styles.socialButtons, marginRight: 30, backgroundColor: theme.COLORS.FACEBOOK }} onPress={() => this.props.navigation.navigate('Home')}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={24}
                        color={"black"}
                        style={{  marginRight: 5 }}
                      />
                      <Text style={{...styles.socialTextButtons, color: theme.COLORS.WHITE}}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={{...styles.socialButtons, marginRight: 30, backgroundColor: argonTheme.COLORS.GMAIL }} onPress={() => this.props.navigation.navigate('Home')}>
                    <Block row >
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={24}
                        color={"black"}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color={'#00c5e8'} size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.WHITE}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        labelStyle={{color:'#fff'}}
                        color={argonTheme.COLORS.WHITE}
                        label="I agree with the Privacy Policies"
                      />
                    </Block>
                    <Block middle>
                      <Button style={styles.createButton} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text bold size={14} color={'#00c5e8'}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        {/* </ImageBackground> */}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#1d2123",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: '#1d2123',
    //borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 10,
    borderColor: "#0c141c",
  },
  socialButtons: {
    width: 120,
    height: 40,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    // backgroundColor: '#3B5998'
  },
  socialButtonsG: {
    width: 120,
    height: 40,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: '#E2E2E2'
  },
  socialTextButtons: {
    color: argonTheme.COLORS.BLACK,
    fontWeight: "800",
    fontSize: 14,
    marginTop: 2
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    //backgroundColor: '#5E72E4'
    backgroundColor: 'transparent',
    borderColor: '#00c5e8',
    borderWidth: 1
  },
});

export default LoginScreen;
