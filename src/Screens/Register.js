import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,

} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import ButtonNew from 'react-native-flat-button';

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


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      password: '',
      toasterVisible: false,
      toasterMsg: "",
      mobileNo: '',
      otp: '',
      otpSent: false,
      otpValidated: false,
      otpValidationMsg: '',
      registerationSuccess: false
    }
    this.clearBoth = this.clearBoth.bind(this);
    this.login = this.login.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);
    this.handleOTPChange = this.handleOTPChange.bind(this);
    this.handleOTPValidation = this.handleOTPValidation.bind(this);
    this.sendOTP = this.sendOTP.bind(this);
  }

    async handleOTPValidation(){
      let otpEntered = this.state.otp;
      console.log(otpEntered);
      var postJson6 = {
        userId: "",
        userName: "",
        password: "",
        emailId: "",							
        mobileNo: this.state.mobileNo,
        otp: this.state.otp,
        otpExpiryDateTime: ""
      }

      console.log(postJson6);
      //let url = 'http://192.168.1.14:8080';
      let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
      await fetch(url + '/validateOtp/', {
            method: 'POST',
            headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(postJson6)
            }
          ).then(response => response.text())
          .then(
            (otpValidationMsg) => {
             this.setState({otpValidationMsg : otpValidationMsg});
      });

      this.setState({ toasterVisible: true, toasterMsg: this.state.otpValidationMsg});
      //otpValidated =
      if(this.state.otpValidationMsg == 'Verified Successfully'){
        this.setState({ otpValidated : true });
      } else {
        this.setState({ otpValidated : false });
      }

      console.log(this.state.otpValidated);
    }

    handleEmailChange(text){
      this.state.userEmail = text;
      this.setState({
        toasterVisible: false,
        userEmail: this.state.userEmail
      });
    }

    handleOTPChange(text){
      this.state.otp = text;
      this.setState({
        toasterVisible: false,
        otp: this.state.otp
      });
    }

    sendOTP(){
      if(this.state.mobileNo == ''){
        return;
      }

      this.setState({ otpSent : true, otpValidated: false, toasterVisible: true, toasterMsg: 'OTP sent to mobile number'});
      var postJson5 = {
        userId: "",
        userName: "",
        password: "",
        emailId: "",							
        mobileNo: this.state.mobileNo,
        otp: "",
        otpExpiryDateTime: ""
      }

      console.log(postJson5);
      //let url = 'http://192.168.1.14:8080';
      let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';

      fetch(url + '/sendOtp/', {
            method: 'POST',
            headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(postJson5)
            }
          )
    }

  handlePasswordChange(text) {
    this.state.password = text;
    this.setState({
      toasterVisible: false,
      password: this.state.password
    });
  }

  handleFirstNameChange(text) {
    this.state.userFirstName = text;
    this.setState({
      toasterVisible: false,
      userFirstName: this.state.userFirstName
    });
  }

  handleLastNameChange(text) {
    this.state.userLastName = text;
    this.setState({
      toasterVisible: false,
      userLastName: this.state.userLastName
    });
  }

  handleMobileChange(text) {
    this.state.mobileNo = text;
    this.setState({
      toasterVisible: false,
      mobileNo: this.state.mobileNo
    });
  }

  handleLastNameChange(text) {
    this.state.userLastName = text;
    this.setState({
      toasterVisible: false,
      userLastName: this.state.userLastName
    });
  }

  clearBoth() {
    this.state.userFirstName = '';
    this.state.userLastName = '';
    this.state.userEmail = '';
    this.state.password = '';
    this.state.mobileNo = '';
    this.state.otp = '';
    //this.state.otp
    //this.state. = '';
    //this.state.username = '';
    this.setState({
      toasterVisible: false,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      userEmail: this.state.userEmail,
      password: this.state.password,
      mobileNo: this.state.mobileNo,
      otp: this.state.otp,
    })
  }

  async login() {
    
    var postJson4 = {
      userName: this.state.userFirstName + " " + this.state.userLastName,
      password: this.state.password,
      emailId: this.state.userEmail,							
      mobileNo: this.state.mobileNo,
    }

    console.log(postJson4);

    //let url = 'http://192.168.1.14:8080';
    let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
        
    await fetch(url + '/registerUser/', {
           method: 'POST',
           headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(postJson4)
          }
        ).then(res => res.text())
         .then(
          (registerationSuccess) => {
           this.setState({registerationSuccess : registerationSuccess, toasterVisible: false})
      });
    
    console.log(this.state.registerationSuccess);
    if ( this.state.registerationSuccess == "true" ){
        //Alert.alert("Registration Successful. Please login using Email and Password");
        this.setState({ toasterVisible: true, toasterMsg: "Registration successful. Please login now"});
        this.props.navigation.navigate('LoginScreen');
    } else {
      this.setState({
        toasterVisible: true,
        toasterMsg: "Email Id already Registered",
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
        <Block style={{ backgroundColor: '#0A121A', width, height, zIndex: 1 }}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              {/* <Block flex={0.25} middle style={styles.socialConnect}>
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
              </Block> */}
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color={'#00c5e8'} size={16}>
                    User Registration Form
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
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.userFirstName}
                        onChangeText={text => this.handleFirstNameChange(text)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Last Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.userLastName}
                        onChangeText={text => this.handleLastNameChange(text)}
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
                        value={this.state.userEmail}
                        onChangeText={text => this.handleEmailChange(text)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
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
                     </Block> 
                    <Block row width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Mobile"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.mobileNo}
                        onChangeText={text => this.handleMobileChange(text)}
                      />
                      {/* <Button style={styles.createButtonPhone}
                          // onPress={() => this.props.navigation.navigate('Home')}
                           onPress={() => this.sendOTP()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            Send OTP
                          </Text>
                        </Button> */}
                        <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.3, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.handleSubmit()}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress={() => this.sendOTP()}
                                        >
                                        Sent OTP
                                    </ButtonNew>
                    </Block>
                    {this.state.otpSent ? 
                    <Block row width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="Enter OTP"
                        iconContent={
                          <Icon
                            size={12}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.otp}
                        onChangeText={text => this.handleOTPChange(text)}
                      />
                      <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.3, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.handleSubmit()}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress={() => this.handleOTPValidation()}
                                        >
                                        Validate OTP
                                    </ButtonNew>
                    </Block>
                    :
                      null
                    }

                    {this.state.otpValidated == true ? 

                    <Block row style={{ marginTop: 10, marginLeft: 25, marginBottom: 25 }}>
                        {/* <Button style={styles.createButton2}
                          onPress={() => this.props.navigation.navigate('Home')}
                          //onPress={() => this.login()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            LOGIN
                          </Text>
                        </Button> */}
                        <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', 
                                            fontSize: 40, width: width *.2, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        //onPress={() => this.props.navigation.navigate('Home')}
                                        onPress={() => this.login()}
                                        >
                                        Register
                                    </ButtonNew>
                        {/* <Button style={styles.createButton2}
                          // onPress={() => this.props.navigation.navigate('Home')}
                          onPress={() => this.clearBoth()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            CLEAR
                          </Text>
                        </Button>
                        <Button style={styles.createButton2}
                           onPress={() => this.props.navigation.navigate('LoginScreen')}
                          //onPress={() => this.login()}
                        >
                          <Text bold size={14} color={'#00c5e8'}>
                            BACK
                          </Text>
                        </Button> */}
                        <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 20, width: width *.2, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                                        >
                                        Back
                                    </ButtonNew>
                                    <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 25, width: width *.2, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        onPress={() => this.clearBoth()}
                                        >
                                        Clear
                                    </ButtonNew>
                    </Block>
                    : <Block row center style={{ marginTop: 10, marginLeft: 25, marginBottom: 25 }}>
                    <ButtonNew
                                    type="custom" 
                                    containerStyle={{ marginTop:5,
                                        backgroundColor: 'black',
                                        fontSize: 20, width: width *.2, height: 50 }}
                                    contentStyle={{ color: '#00c5e8' }}
                                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                                    >
                                    Back
                                </ButtonNew>
                                <ButtonNew
                                    type="custom" 
                                    containerStyle={{ marginTop:5,
                                        backgroundColor: 'black', marginLeft: 15,
                                        fontSize: 25, width: width *.2, height: 50 }}
                                    contentStyle={{ color: '#00c5e8' }}
                                    onPress={() => this.clearBoth()}
                                    >
                                    Clear
                                </ButtonNew>
                </Block>
                 }
                    {/* <Block middle>
                      {/* <Button style={styles.createButton}
                        onPress={() => this.props.navigation.navigate('Register')}
                      >
                        <Text bold size={14} color={'#00c5e8'}>
                          CREATE ACCOUNT
                          </Text>
                      </Button>
                      <ButtonNew
                                        type="custom" 
                                        containerStyle={{ marginTop:5,
                                            backgroundColor: 'black', marginLeft: 15,
                                            fontSize: 25, width: width *.25, height: 50 }}
                                        contentStyle={{ color: '#00c5e8' }}
                                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                                        >
                                        Clear
                                    </ButtonNew>
                    </Block> */}

                    
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
  inputIconsPhone: {
    width: width * .75
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
    width: width * 0.2,
    marginTop: 25,
    marginRight: 15,
    //backgroundColor: '#5E72E4'
    backgroundColor: 'transparent',
    borderColor: '#00c5e8',
    borderWidth: 1
  },
  createButtonPhone: {
    width: width * 0.3,
    marginTop: 8,
    marginLeft: 10,
    //backgroundColor: '#5E72E4'
    backgroundColor: 'transparent',
    borderColor: '#00c5e8',
    borderWidth: 1
  },
});

export default Register;
