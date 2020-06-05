import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
import SearchMap from "./SearchMap.js";
const { width, height } = Dimensions.get("screen");

import _ from 'lodash';

import Modal from 'react-native-modal';
import AddIncidentPopUp  from  './AddIncidentPopUp';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            tickerArray: [
                {
                    title: 'Inspections & Public Service',
                    desc: 'Notice of Violation. Notice of Emergency Corrective Action Hearings. Emergency Corrective Action Administrative OrdersIncident 1 description',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 1 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: [],
                    coordinate: {
                        latitude: 51.5588,
                        longitude: 0.0691,
                    },
                },{
                    title: 'Robbery/Miscellaneous',
                    desc: 'Administrative Hearing Procedures – Hearings Before Hearing Officer. Audio/Video CDs – Dangerous Buildings Administrative Hearings. Application for Extension - Expired Dangerous Building Administrative Orders',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 2 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: [],
                    coordinate: {
                        latitude: 12.9275,
                        longitude: 77.6810,
                    },
                },{
                    title: 'Assault/No Injury',
                    desc: 'Correspondence regarding Park Issues. Maintenance Records of Park Property and Facilities. Parks Master Plan',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 3 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: [],
                    coordinate: {
                        latitude: 37.78825,
                        longitude: -122.4424,
                    },
                },/*{
                    title: 'Burglary/Forcible Entry',
                    desc: 'Calls for Service.Uniform Crime Reports Accident. Reports Incident and Offense Reports',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 4 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: []
                },{
                    title: 'Suspicious Activity/Vehicle',
                    desc: 'Utility Maintenance (Water and Wastewater). Building Permits. Building Code Violations. Occupancy Records. Real Estate Acquisitions and Sales, Appraisals',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 5 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: []
                },{
                    title: 'Narcotic Drug Laws/Possession',
                    desc: 'The following active incidents are dispatched from the Emergency Operations Center in Eagleville.The contents are updated at four minute intervals from the CAD (Computer Aided Dispatch) system',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 6 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: []
                },{
                    title: 'Disorderly Conduct/Other',
                    desc: 'We analyzed a listing from rspa accident/incident data base and found that, in 1986 and 1987, there were 78 shippers that reported 3 or more hazardous',
                    comments: [{id: '1', name: 'User 1', text: 'Incidents 7 Comments by User 1'}],
                    imageUrls: [],
                    videoUrls: []
                }*/
            ],
            visibleModal: false,
            newCoords: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
        this.saveIncident = this.saveIncident.bind(this);
        this.callbackMapFn = this.callbackMapFn.bind(this);
		this.renderButton = this.renderButton.bind(this);
        this.renderModalContent = this.renderModalContent.bind(this);
        this.enableModalFn = this.enableModalFn.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.callbackPopUp = this.callbackPopUp.bind(this);
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
    saveIncident(obj){
        var arr = this.state.tickerArray;
        arr.push(obj);
        this.setState({tickerArray: arr});
    }
    callbackFn(title, commentText, imageUrl, videoUrl){
        let node = _.filter(this.state.tickerArray, function(o) { 
            if(o.title == title)
                return o; 
            });
        let existingComments = node[0].comments;
        let length = existingComments.length + 1;
        existingComments.push({id: ''+length, name: 'New User', text: commentText, imageUrls: imageUrl,
            videoUrls: videoUrl});
        
        //console.log(this.state.tickerArray);

        this.setState({tickerArray: this.state.tickerArray});
    }

    callbackMapFn(objTitle){
        //console.log("Wrong");
        let tempArray = this.state.tickerArray;
        var newNode = {
            title: objTitle.title, 
            desc: objTitle.desc,
            imageUrls: objTitle.imageUrls,
            videoUrls: objTitle.videoUrls, 
            comments: objTitle.comments,
            coordinate: objTitle.coordinate.data
        };
        tempArray.push(newNode);
        //this.state.tickerArray = tempArray;
        //console.log(objTitle.coordinate.data);
        this.setState({tickerArray: tempArray});
    }
	
	callbackPopUp(selectedDrpDwn, description, selImages, selVideos){
        let existingArray = this.state.tickerArray;
        
        let newNodeToAdd = {
            title: selectedDrpDwn, 
            desc: description,
            imageUrls: selImages,
            videoUrls: selVideos, 
            comments: [],
            coordinate: this.state.newCoords.data
        };
        //console.log(newNodeToAdd);

        existingArray.push(newNodeToAdd);
        this.setState({tickerArray: existingArray});
    }

    navigate(screen, incDetails){
        
        if(screen == 'AddIncident'){
            this.props.navigation.navigate(screen, {data: incDetails, callback: this.callbackMapFn});
        } else {
           this.props.navigation.navigate(screen, {data: incDetails, callback: this.callbackFn});
        }

        //this.props.navigation.navigate(screen, {data: coords, callback: this.callbackMapFn});
    }
	
	    enableModalFn(screen, markerCoords){
        this.setState({ visibleModal: true, newCoords: markerCoords });
    };

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
    );

    closePopUp(){
        this.setState({ visibleModal: false });
    }
    
    renderModalContent = () => (
        <Block>
          <AddIncidentPopUp 
            closePopUp={this.closePopUp.bind(this)} 
            createIncident={this.callbackPopUp.bind(this)} 
          />
        </Block>
    );


    render() {
        
      return (
        
    <View style={styles.container}>
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
            <Block style={{backgroundColor: '#00c5e8'}} middle>
                <Text style={styles.profileText}>Incident Tracker</Text>
            </Block>
            <View style={{height:50}}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TextTicker style={{ height:50,padding:15,fontSize: 17, backgroundColor: 'black'}} 
                            //duration={10000} bounce={false}
                            loop={true}
                            scrollSpeed={3000}
                            >
                        {this.state.tickerArray.map((incident, i) => (
                            <Text style={{color: 'orange'}} key={i} onPress={() => this.props.navigation.navigate('IncidentDetailsScreen', {data: incident, callback: this.callbackFn})}>
                                {incident.title  + '  |  '}
                            </Text>
                        ))}
                        </TextTicker>    
                    </View>
                </View>
            </View>
            <SearchMap 
                navigateTo={this.navigate.bind(this)} 
                tickerArray={this.state.tickerArray}
                enableModal={this.enableModalFn.bind(this)} />
            {this.state.visibleModal == true ? 
                <View style={{  marginTop: '50%',  height:height * .5}}>
                    <Modal isVisible={this.state.visibleModal}>
                        {this.renderModalContent()}
                    </Modal>
                </View> : null}
			{/* <View style={styles.add} >
                <Block middle>
                    <Button style={styles.createButton} onPress={() => this.props.navigation.navigate('AddIncident', {callback: this.saveIncident})}>
                        <Text bold size={14} color={'#00c5e8'}>
                        Add an Incident
                        </Text>
                    </Button>
                </Block>
            </View> */}
        </Block>
    </View>
    );
    }
  }

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    add:{
        marginTop: height * 0.65
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

export default Home; 

