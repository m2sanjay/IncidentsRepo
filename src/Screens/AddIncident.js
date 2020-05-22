import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
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

class AddIncident extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            image: null,
            videoUrl: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
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
        if(this.props.navigation.state.params.callback != null)
            this.props.navigation.state.params.callback(
                {title: this.state.title, desc: this.state.text, imageUrl:this.state.image, comments: []}
            );
        this.setState({title: '', text: '', image: null});
        this.props.navigation.navigate('Home');
    }
    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };
    
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                if(result.type == 'video')
                    this.setState({ videoUrl: result.uri, image: null });
                else
                this.setState({ videoUrl: null, image: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    };
    handleImageClick(){
        this.getPermissionAsync();
        this._pickImage();
    }
    
    render() {
        
      return (
        
    <View style={styles.container}>
        {/* <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}> */}
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
            <Block style={{backgroundColor: '#00c5e8'}} middle>
                <Text style={styles.profileText}>Add an Incident</Text>
            </Block>
            <Block flex middle>
                <Block style={styles.registerContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <ScrollView>
                                <View>
                                    {
                                    this.state.image != null ? (<Image source={{ uri: this.state.image }} style={{ width: width-20, height: 300 }} />)
                                    : (this.state.videoUrl != null ? (<Video source={{uri: this.state.videoUrl}}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        resizeMode="cover"
                                        shouldPlay
                                        isLooping={false}
                                        useNativeControls={true}
                                        style={{width: width-20, height: 300}} />):(<View/>))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                
                        <View style={{marginTop:'2%'}}>
                            <View style={styles.location}>
                                <Icon style={styles.loginIcon}  name="location-pin" family="Entypo" color={'#fc408a'} size={35} />
                                <Text style={styles.textLogin}>{'Location of the Incident'}</Text> 
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
                                <Block middle row style={{margin: 0,padding:0}}>
                                    {/* <Icon onPress={this.handleImageClick} style={styles.camera} name="image" family="Entypo" size={55} />
                                    <Icon style={styles.camera} name="video-camera" family="Entypo" size={55} /> */}
                                    <Button style={styles.createButton1} onPress={this.handleImageClick}>
                                        <Block row >
                                            <Icon style={styles.btnIcon} name="image" family="Entypo" size={30} />
                                            <Text style={styles.btnText} bold size={14} color={'#00c5e8'}>{'Upload'}</Text> 
                                        </Block> 
                                    </Button>
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
    btnIcon:{
        color: '#00c5e8',
        marginRight: 10,
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
        width: width * 0.35,
        marginTop: 10,
        marginRight: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
      },
    createButton: {
        width: width * 0.25,
        marginTop: 10,
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
        color: 'black',
    },
    textareaContainer: {
        height: 80,
        padding: 5,
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

export default AddIncident; 

