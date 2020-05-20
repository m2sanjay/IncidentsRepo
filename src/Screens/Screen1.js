import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

import _ from 'lodash';

class Screen1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            tickerArray: [
                {
                    title: 'Inspections & Public Service',
                    desc: 'Notice of Violation. Notice of Emergency Corrective Action Hearings. Emergency Corrective Action Administrative OrdersIncident 1 description',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 1 Comments by User 1'}]
                },{
                    title: 'Robbery/Miscellaneous',
                    desc: 'Administrative Hearing Procedures – Hearings Before Hearing Officer. Audio/Video CDs – Dangerous Buildings Administrative Hearings. Application for Extension - Expired Dangerous Building Administrative Orders',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 2 Comments by User 1'}]
                },{
                    title: 'Assault/No Injury',
                    desc: 'Correspondence regarding Park Issues. Maintenance Records of Park Property and Facilities. Parks Master Plan',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 3 Comments by User 1'}]
                },{
                    title: 'Burglary/Forcible Entry',
                    desc: 'Calls for Service.Uniform Crime Reports Accident. Reports Incident and Offense Reports',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 4 Comments by User 1'}]
                },{
                    title: 'Suspicious Activity/Vehicle',
                    desc: 'Utility Maintenance (Water and Wastewater). Building Permits. Building Code Violations. Occupancy Records. Real Estate Acquisitions and Sales, Appraisals',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 5 Comments by User 1'}]
                },{
                    title: 'Narcotic Drug Laws/Possession',
                    desc: 'The following active incidents are dispatched from the Emergency Operations Center in Eagleville.The contents are updated at four minute intervals from the CAD (Computer Aided Dispatch) system',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 6 Comments by User 1'}]
                },{
                    title: 'Disorderly Conduct/Other',
                    desc: 'We analyzed a listing from rspa accident/incident data base and found that, in 1986 and 1987, there were 78 shippers that reported 3 or more hazardous',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 7 Comments by User 1'}]
                }
            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
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
        arr.push({title: this.state.title, desc: this.state.text, comments: []});
        this.setState({tickerArray: arr, title: '', text: ''});
        alert("Your incident is submitted.");
    }
    
    callbackFn(title, commentText){
        let node = _.filter(this.state.tickerArray, function(o) { 
            if(o.title == title)
                return o; 
            });
        let existingComments = node[0].comments;
        let length = existingComments.length + 1;
        existingComments.push({id: ''+length, name: 'New User', text: commentText});

        this.setState({tickerArray: this.state.tickerArray});
    }

    render() {
        
      return (
        
    <View style={styles.container}>
        {/* <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}> */}
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
            <Block style={{backgroundColor: '#00c5e8'}}>
                <Text style={styles.profileText}>Incident Tracker</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text h5 style={styles.horizontalText}>Ticker</Text>
                </View>
            </Block>

            <View style={{height:50}}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TextTicker style={{ height:50,padding:15,fontSize: 17, backgroundColor: 'black'}} duration={10000} bounce={false}>
                        {this.state.tickerArray.map((incident, i) => (
                            <Text style={{color: 'orange'}} key={i} onPress={() => this.props.navigation.navigate('Screen2', {data: incident, callback: this.callbackFn})}>
                                {incident.title  + '  |  '}
                            </Text>
                        ))}
                            {/* <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 1 {'     '}
                            </Text>
                            <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 2 {'     '}
                            </Text>
                            <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 3 {'     '}
                            </Text>
                            <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 4 {'     '}
                            </Text>
                            <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 5 {'     '}
                            </Text>
                            <Text onPress={() => this.props.navigation.navigate('Screen2')}>
                                Incident 6 {'     '}
                            </Text> */}
                        </TextTicker>    
                    </View>
                    
                </View>
            </View>
            
            <Block flex middle>
                <Block style={styles.registerContainer}>
                    <View style={{marginTop:60,flexDirection:'row',}}>
                        <Text h5 style={styles.MessageText}>Add New Incident </Text>
                    </View>

                    <ScrollView>
                        <View style={{marginTop:'2%'}}>
                            <View 
                                style={{
                                    flexDirection:'row',
                                    backgroundColor:'#2DCE89',
                                    marginLeft:'5%',
                                    marginRight:'5%',
                                    borderRadius:5,
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
                            </View>   
                
                            <View style={{
                                    flexDirection:'column',
                                    marginLeft:'5%',
                                    marginRight:'5%',
                                    borderRadius:10,
                                    paddingBottom:'5%'
                                }}>
                                <Textarea2
                                    id="textAreaId1"
                                    containerStyle={styles.textareaContainer1}
                                    style={styles.textarea1}
                                    maxLength={20}
                                    value={this.state.title}
                                    placeholderTextColor={'black'}
                                    placeholder={'Title of the Incident'}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText = {(text) => this.handleChange1(text)}
                                />
                                <Textarea2
                                    id="textAreaId"
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    maxLength={120}
                                    value={this.state.text}
                                    placeholderTextColor={'black'}
                                    placeholder={'Describe the Incident'}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText = {(text) => this.handleChange(text)}
                                />
                                <Block middle>
                                    <Button style={styles.createButton} onPress={this.handleSubmit}>
                                        <Text bold size={14} color={'#00c5e8'}>
                                        Submit
                                        </Text>
                                    </Button>
                                </Block>
                            </View>
                        </View>
                    </ScrollView>
                </Block>
            </Block>
        {/* </ImageBackground> */}
        </Block>
    </View>
    );
    }
  }

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
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
        borderRadius:5,
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
        borderRadius:5,
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.70,
        backgroundColor: "#1d2123",
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

export default Screen1; 

