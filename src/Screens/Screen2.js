import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

class Screen2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            tickerArray: ['Incident 1','Incident 2','Incident 3','Incident 4','Incident 5','Incident 6',],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange1(e){
        this.setState({title: e});
    }
    handleChange(e){
        this.setState({text: e});
    }
    handleSubmit(){
        if(this.state.title == '') 
        {
            alert('Please type in Incident details');
            return;
        }
        var arr = this.state.tickerArray;
        arr.push(this.state.title);
        this.setState({tickerArray: arr, title: '', text: ''});
        alert("Your incident is submitted.");
    }
    render() {
      //alert(this.props.title);
      return (
        
    <View style={styles.container}>
        <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}>
            <Block style={{backgroundColor: '#fff'}}>
                <Text style={styles.profileText}>Incident Details</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text h5 style={styles.horizontalText}>Incident 3</Text>
                </View>
            </Block>

            
            
            <Block flex middle>
                <Block style={styles.registerContainer}>
                    <View style={styles.desc}>
                        <Text style={styles.MessageText}>Incident Description is here... </Text>
                    </View>

                    <ScrollView>
                        <View style={{marginTop:'2%'}}>
                            {/* <View 
                                style={{
                                    flexDirection:'row',
                                    backgroundColor:'#2DCE89',
                                    marginLeft:'5%',
                                    marginRight:'5%',
                                    borderRadius:10,
                                    marginBottom:'3%',     
                                }}>
                                <Icon
                                    style={styles.loginIcon} 
                                    name="location-pin" 
                                    family="Entypo"
                                    color={'#fc408a'} 
                                    size={35}         
                                    />
                                <Text style={styles.textLogin}>{'Add a location'}</Text> 
                            </View>    */}
                
                            <View style={{
                                    flexDirection:'column',
                                    marginLeft:'5%',
                                    marginRight:'5%',
                                    borderRadius:10,
                                    paddingBottom:'5%'
                                }}>
                                {/* <Textarea2
                                    id="textAreaId1"
                                    containerStyle={styles.textareaContainer1}
                                    style={styles.textarea1}
                                    maxLength={20}
                                    value={this.state.title}
                                    placeholderTextColor={'black'}
                                    placeholder={'Add Comments'}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText = {(text) => this.handleChange1(text)}
                                /> */}
                                <Textarea2
                                    id="textAreaId"
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    maxLength={120}
                                    value={this.state.text}
                                    placeholderTextColor={'black'}
                                    placeholder={'Comments'}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText = {(text) => this.handleChange(text)}
                                />
                                <Block middle>
                                    <Button color="primary" style={styles.createButton} onPress={this.handleSubmit}>
                                        <Text bold size={14} color={'#fff'}>
                                        Submit
                                        </Text>
                                    </Button>
                                </Block>
                            </View>
                        </View>
                    </ScrollView>
                </Block>
            </Block>
        </ImageBackground>
    </View>
    );
    }
  }

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    desc:{
      marginTop:20,
      height:height*0.37,
      flexDirection:'row',
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        backgroundColor: '#5E72E4'
      },
    gradient:{
        flex:1
    },
    gradientJob:{
        marginLeft:'5%',
        marginRight:'5%',
        height:'20%',
        borderRadius:15
    },
    profileText:{
        fontSize:40,
        fontWeight:'bold',
        color:'black',
        marginTop:'13%',
        marginLeft:'5%',
        marginBottom:'2%'
    },
    jobCard:{
        height:'100%',
        borderColor:'transparent',
        
    },
    horizontalText:{
        fontWeight:'700',
        color:'black',
        marginLeft:'5%',
        marginTop:'3%',
        paddingBottom:'3%',

    },  
    tickerText:{
        color:'black',
        backgroundColor: 'red'

    },
    horizontalButton:{
        borderRadius:230,
        width:'5%',
        justifyContent:'space-between',
        marginTop:'1%',
    },  
    img1S1:{
        height:75,
        width:75,
        borderRadius:35,
      
    },
    MessageText:{
        alignSelf:'flex-start',
        fontWeight:'700',
        
        color:'#fff',
        marginLeft:'5%',
        marginTop:'2%',
            
    },
    loginCard:{
        marginLeft:'5%',
        marginRight:'5%',
        backgroundColor:'#680d64',
        borderColor:'transparent'

    },
    loginIcon:{
       paddingLeft:'7%',
       marginBottom:'5%',
       marginTop:'5%' 
       
    },
    textLogin:{
        fontSize:15,
        fontWeight:'400',
        color:'#fff',
        alignSelf:'center',
        paddingLeft:'5%',
        marginBottom:'3%',
    },
    locationCard:{
        marginLeft:'5%',
        marginRight:'5%',
        backgroundColor:'#680d64',
        borderColor:'transparent'
    },
    locationIcon:{
        paddingLeft:'7%',
        marginTop:'6%' 
    },
    locationText:{
        fontSize:15,
        fontWeight:'400',
        color:'grey',
        alignSelf:'center',
        marginTop:'2%',
        paddingLeft:'5%'
    },
    textRow1:{
        color:'grey',
        marginRight:'5%',
        marginTop:'3%',
        paddingBottom:'3%',
        fontWeight:'bold'
    },
    textRow2:{
        color:'grey',
        marginRight:'5%',
        marginTop:'3%',
        paddingBottom:'3%',
        fontWeight:'bold'
    },
    firstCardImg:{
        borderRadius:25,
        marginLeft:'5%',
        width: 50,
        height: 50 
    },
    Mao:{
        color:'black',
        fontWeight:'bold',
        marginLeft:'15%',
        // paddingTop:'2%'
    },
    maoIcon:{
        // paddingBottom:'40%',
        // marginTop:'2%'
    },
    Designer:{
        color:'grey',
        marginLeft:'15%',
        marginBottom:'25%',
    },
    badge:{
        // marginTop:'5%'
    }, 
    textareaContainer1: {
        height: 40,
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius:10,
    },
    textarea1: {
        textAlignVertical: 'top',  // hack android
        height: 40,
        fontSize: 12,
        color: 'black',
    },
    textareaContainer: {
        height: 120,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius:10,
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.70,
        backgroundColor: "#3C57C4",
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden"
      },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 110,
        fontSize: 12,
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#fc408a',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'black'
    },
    friendsView:{
        marginTop:'1%',
        paddingBottom:'5%'
    },
    friends:{
        borderRadius:100,
        alignSelf:'center',
        // marginTop:'4%',
    },
});

export default Screen2; 

