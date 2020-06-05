import React from 'react';
import { StyleSheet, View, Picker,
    ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions, ToastAndroid } from 'react-native';
import { Icon, Card, Button, Text, Block } from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import CameraView from './CameraView';
import _ from 'lodash';
import { Video } from 'expo-av';

import { Dropdown } from 'react-native-material-dropdown';

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(props.message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 150);
        return null;
    }
    return null;
};
class AddIncidentPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: '',
            imageUrls: [],
            videoUrls: [],
            toasterVisible: false,
            toasterMsg: '',
            coordinate: null,
            selectedValue: null,
            typeOfIncident : [
                { value: 'Fire', }, 
                { value: 'Accident', }, 
                { value: 'Incident X', },
                { value: 'Incident Y', },
                { value: 'Incident Z', }
            ]
        }

        this.setSelectedValue = this.setSelectedValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
    }

    handleImageClick() {
        this.getPermissionAsync();
        this._pickImage();
    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let urlsArray = this.state.imageUrls;
                urlsArray.push(result.uri);
                this.setState({ imageUrls: urlsArray });
            }
        } catch (E) {
            console.log(E);
        }
    };
    
    _pickVideo = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let urlsArray = this.state.videoUrls;
                urlsArray.push(result.uri);
                this.setState({ videoUrls: urlsArray });
            }
        } catch (E) {
            console.log(E);
        }
    };


    handleVideoClick() {
        this.getPermissionAsync();
        this._pickVideo();
    }

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    };

    setSelectedValue(value){
        this.setState({ selectedValue : value});
    }

    handleChange(e){
        this.setState({text: e});
    }

    handleSubmit() {
        //alert(this.state.text);
        // if (this.state.text == '') {
        //     alert('Please type in comments');
        //     return;
        // }

        if (this.state.selectedValue == null) {
            this.setState({
                toasterVisible: true,
                toasterMsg: "Please type in comments",
            });
            return;
        }

        this.setState({ submitted: true });
        
        this.props.createIncident(
                this.state.selectedValue,
                this.state.text,
                this.state.imageUrls,
                this.state.videoUrls
        );       

        this.props.closePopUp();
        
        this.setState({
            toasterVisible: true,
            toasterMsg: "Incident Comments Added Successfully",
            text: "",
            imageUrl: "",
            videoUrl: "",
        });
    }

    render() {
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];

        return (

            <View style={styles.container}>
                {this.state.toasterVisible ?
                    <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg}/>: null 
                }
                <View style={{marginTop:'2%'}}>
                    <View style={styles.addView}>
                                <Dropdown
                                    label="Type of Incident"
                                    data={this.state.typeOfIncident}
                                    baseColor="black"
                                    containerStyle={{ 
                                        backgroundColor: '#fff',
                                        borderRadius:10, 
                                        
                                        margin: '3%', 
                                        paddingLeft: 10,
                                        paddingRight: 10 
                                    }}
                                    onChangeText={this.setSelectedValue}
                                />
                                <Block row style={{padding: 10}}>
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
                                </Block>
                                {this.state.imageUrls.length !=0 || this.state.videoUrls.length != 0 ?
                                (<Block row>
                                    {this.state.imageUrls.length > 0 ? 
                                        (this.state.imageUrls.map((o, i) => (
                                            <Image
                                                key={i}
                                                source={{ uri: o }}
                                                resizeMode="contain"
                                                style={{ marginLeft: "5%", width: 50, height: 50 }}
                                            /> ))
                                        ) : null}
                                    {this.state.videoUrls.length > 0 ? 
                                        (this.state.videoUrls.map((o, i) => (
                                            <Video
                                                key={i}
                                                source={{ uri: o }}
                                                rate={1.0}
                                                volume={1.0}
                                                isMuted={false}
                                                resizeMode="contain"
                                                shouldPlay={false}
                                                isLooping={false}
                                                useNativeControls={true}
                                                style={{ marginLeft: "5%", width: 50, height: 50 }}
                                            /> ))
                                        ) : null}
                                    
                                </Block>) : null}
                                <Block right row style={{marginTop: 10,padding:0,flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Button shadowless={true} color='#fff' style={styles.createButtonNew} onPress={this.handleImageClick}>
                                        <Icon style={styles.btnIcon} name="image" family="Entypo" size={30} />
                                    </Button>
                                    <Button style={styles.createButtonNew} onPress={this.handleVideoClick}>
                                        <Icon style={styles.btnIcon} name="video" family="Entypo" size={30} />
                                    </Button>
                                    <Button style={styles.createButton3} onPress={this.handleSubmit}>
                                        <Text bold size={14} color={'#00c5e8'}>Submit</Text>
                                    </Button>
                                    <Button style={styles.createButton3} onPress={this.props.closePopUp}>
                                        <Text bold size={14} color={'#00c5e8'}>Cancel</Text>
                                    </Button>
                                </Block>
                            </View>
                        </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1
    },
    createButtonNew: {
        width: width * 0.1,
        marginTop: 10,
        marginRight: 5,
        borderWidth: 0,
        borderColor: 'transparent',
        shadowOpacity:0,
        shadowColor: 'transparent',
        color:'#fff',
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent'
    },
    createButton3: {
        width: width * 0.25,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderWidth: 0,
        alignSelf: 'flex-end'
        
      },
    btnIcon:{
        color: '#00c5e8'
    },
    btnText:{
        marginLeft: 5,
        marginTop: 5,
    },
    imageContainer:{
        width: width-20,
        height: height * 0.40,
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
    location: {
        flexDirection:'row',  
        backgroundColor:'#2DCE89',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:5,
        marginBottom:'3%',
    },
    createButton1: {
        width: width * 0.15,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
      },
    createButton: {
        width: width * 0.20,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 5
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
    addView:{
        flexDirection:'column',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:10,
        paddingBottom:'5%',
        backgroundColor: '#fff',
        opacity: 0.6
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
    imageView:{
        marginTop: '2%',
        flexDirection:'column',
        backgroundColor: '#1D2123',
        marginBottom: '2%'
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
    camera:{
        paddingLeft:'2%',
        marginTop:32,
        marginRight:10,
        color: '#00c5e8'
    },
    loginIcon:{
       paddingLeft:'2%',
       //marginBottom:'2%',
       marginTop:'2%'
    },
    textLogin:{
        fontSize:15,
        fontWeight:'400',
        color:'#fff',
        alignSelf:'center',
        paddingLeft:'2%',
        //marginBottom:'2%',
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
        height: 30,
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius:5,
    },
    textarea1: {
        textAlignVertical: 'top',  // hack android
        height: 30,
        fontSize: 12,
        color: 'white',
    },
    drpdown: {
        textAlignVertical: 'top',  // hack android
        height: 30,
        fontSize: 18,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 3,
        color: 'black',
        backgroundColor: '#fff',
    },
    textareaContainer: {
        height: 80,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius:5,
    },
    registerContainer: {
        width: width * 0.95,
        height: height * 0.80,
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
        paddingLeft: 5
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

export default AddIncidentPopUp;
