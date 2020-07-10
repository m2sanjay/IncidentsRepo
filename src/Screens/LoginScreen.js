import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ToastAndroid,

} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const Toast = (props) => {
  if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
          props.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          150
      );
      return null;
  }
  return null;
};


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        toasterVisible: false,
        toasterMsg: "",
    }
    this.clearBoth = this.clearBoth.bind(this);
    this.login = this.login.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  handlePasswordChange(text){
    this.state.password = text;
    this.setState({ 
      toasterVisible: false,
      username: this.state.username });
  }

  handleUserNameChange(text){
    this.state.username = text;
    this.setState({ toasterVisible: false,
      password : this.state.password });
  }

  clearBoth(){
    this.state.password = '';
    this.state.username = '';
    this.setState({
      toasterVisible: false,
      username: this.state.username,
      password: this.state.password
    })
  }

  login(){
    console.log("login Called");
    console.log(this.state.username);
    console.log(this.state.password);

    let user = this.state.username;
    let pass = this.state.password;

    if(user.toLocaleLowerCase() == 'sanjay.barman@gmail.com' && pass == 'admin@123'){
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        toasterVisible: true,
        toasterMsg: "Username or Password entered is incorrect",
      });
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex middle>
        {this.state.toasterVisible ?
          <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg} /> : null
        }
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
                  <Button style={{...styles.socialButtons, marginRight: 30, backgroundColor: theme.COLORS.FACEBOOK }} 
                    // onPress={() => this.props.navigation.navigate('Home')}
                  >
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
                  <Button style={{...styles.socialButtons, marginRight: 30, backgroundColor: argonTheme.COLORS.GMAIL }} 
                    // onPress={() => this.props.navigation.navigate('Home')}
                  >
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
                    Or login using classic way
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
                        value={this.state.username}
                        onChangeText={text => this.handleUserNameChange(text)}
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
                        value={this.state.password}
                        onChangeText={text => this.handlePasswordChange(text)}
                      />
                      <Block row style={{ marginTop: theme.SIZES.BASE, marginLeft: 25, marginBottom: 25 }}>
                        <Button style={styles.createButton2} 
                          // onPress={() => this.props.navigation.navigate('Home')}
                          onPress = {() => this.login()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            LOGIN
                          </Text>
                        </Button>
                        <Button style={styles.createButton2} 
                          // onPress={() => this.props.navigation.navigate('Home')}
                          onPress = {() => this.clearBoth()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            CLEAR
                          </Text>
                        </Button>
                      </Block>
                   </Block>
                   <Block flex={0.17} middle>
                    <Text color={'#00c5e8'} size={12}>
                      Or create an account for login
                    </Text>
                  </Block>
                   <Block middle>
                      <Button style={styles.createButton} 
                        onPress={() => this.props.navigation.navigate('Home')}
                      >
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
  createButton2: {
    width: width * 0.3,
    marginTop: 25,
    marginRight: 30,
    //backgroundColor: '#5E72E4'
    backgroundColor: 'transparent',
    borderColor: '#00c5e8',
    borderWidth: 1
  },
});

export default LoginScreen;
