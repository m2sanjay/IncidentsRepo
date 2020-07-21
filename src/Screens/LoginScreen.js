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

import ButtonNew from 'react-native-flat-button';

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
        loggedInUser: null
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

  async login(){
    var postJson4 = {
      userId: "",
      userName: "",
      password: this.state.password,
      emailId: this.state.username,							
      mobileNo: "",
      otp: "",
      otpExpiryDateTime: ""
    }

    //this.state.loggedInUser = {} ;

    //let url = 'http://192.168.1.14:8080';
    let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
    await fetch(url + '/validateUserLogin/', {
           method: 'POST',
           headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(postJson4)
          }
        ).then(res => res.text())
         .then((text) => text.length ? JSON.parse(text) : {})
         .then(
          (loggedInUser) => {
           this.setState({loggedInUser : loggedInUser})
      });
      
    if(this.state.loggedInUser.emailId != undefined && this.state.loggedInUser.emailId != "") {
        console.log("Login Successful " + this.state.loggedInUser.emailId);
        this.setState({
          username: "",
          password: "",
          toasterVisible: true,
          toasterMsg: "Login Successful",
        });
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
                      <Block row style={{ marginTop: 30, marginLeft: 25, marginBottom: 25 }}>
                        {/* <Button style={styles.createButton2} 
                           onPress={() => this.props.navigation.navigate('Home')}
                          //onPress = {() => this.login()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            LOGIN
                          </Text>
                        </Button> */}
                        <ButtonNew
                                        type="custom" 
                                        containerStyle={{ 
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.3, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.handleSubmit()}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress = {() => this.login()}
                                        >
                                        Login
                                    </ButtonNew>
                        {/* <Button style={styles.createButton2} 
                          // onPress={() => this.props.navigation.navigate('Home')}
                          onPress = {() => this.clearBoth()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            CLEAR
                          </Text>
                        </Button> */}
                        <ButtonNew
                                        type="custom" 
                                        containerStyle={{ 
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.3, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.handleSubmit()}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress = {() => this.clearBoth()}
                                        >
                                        Clear
                                    </ButtonNew>
                      </Block>
                   </Block>
                   <Block flex={0.17} middle>
                    <Text color={'#00c5e8'} size={12}>
                      Or create an account for login
                    </Text>
                  </Block>
                   <Block middle>
                      {/* <Button style={styles.createButton} 
                        onPress={() => this.props.navigation.navigate('Register')}
                      >
                        <Text bold size={14} color={'#00c5e8'}>
                          CREATE ACCOUNT
                        </Text>
                      </Button> */}
                      <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:25,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.5, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.handleSubmit()}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress={() => this.props.navigation.navigate('Register')}
                                        >
                                        Create Account
                                    </ButtonNew>
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
