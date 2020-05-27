import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get("screen");

import _ from 'lodash';

class SearchMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            region: {latitude: 42.882004,longitude: 74.582748,latitudeDelta: 0.0922,longitudeDelta: 0.0421},
            locationResult:''
        }
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    }
    componentDidMount() {
    this._getLocationAsync();
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({locationResult: 'Permission to access location was denied'});
            return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ region: {latitude: Location.latitude,longitude: Location.longitude}});
    };
    onRegionChange(region) {
        
    }
    onRegionChangeComplete(region){
        this.setState({ region: region });
    }
    onPress(mapEvent){
        alert(this.state.locationResult+':::'+mapEvent.coordinate);
    }
    render() {
        
      return (
        
                        
                               
                        <MapView
                            style={{flex: 1}}
                            region={this.state.region} 
                            showsUserLocation={true}
                            zoomEnabled={true}  
                            zoomControlEnabled={true}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                            onPress = {this.onPress.bind(this)}
                        />
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
        marginTop:'2%',
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
    mapContainer:{
        width: width-20,
        height: height * 0.60,
        backgroundColor: "#1d2123",
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.60,
        backgroundColor: "#1d2123",
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
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

export default SearchMap; 

