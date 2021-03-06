import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions, ToastAndroid} from 'react-native';
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

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(props.message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 150,);
        return null;
    }
    return null;
};
class AddIncident extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            imageUrls: [],
            videoUrls: [],
            toasterVisible: false,
            toasterMsg: '',
            coordinate: this.props.navigation.state.params.data
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
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
            this.setState({toasterVisible: true, toasterMsg: 'Please type in Incident details'});
            return;
        }

        //console.log(this.props.navigation.state.params.data);

        if(this.props.navigation.state.params.callback != null)
            this.props.navigation.state.params.callback(
                {title: this.state.title, 
                    desc: this.state.text, 
                    imageUrls:this.state.imageUrls, 
                    videoUrls: this.state.videoUrls,
                    comments: [],
                    coordinate: this.props.navigation.state.params.data
                }
            );
        
        this.setState({toasterVisible: true, toasterMsg: 'Incident Added Successfully',
            title: '', text: '', imageUrls: [], videoUrls: [], comments: [], coordinate: {}
        });
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
    handleImageClick(){
        this.getPermissionAsync();
        this._pickImage();
    }
    handleVideoClick(){
        this.getPermissionAsync();
        this._pickVideo();
    }
    
    render() {
        
      return (
        
    <View style={styles.container}>
        {/* <ImageBackground source={Images.RegisterBackground} style={{ width, height, zIndex: 1 }}> */}
        {this.state.toasterVisible ?
            <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg}/>: null 
        }
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
            <Block style={{backgroundColor: '#00c5e8'}} middle>
                <Text style={styles.profileText}>Add an Incident</Text>
            </Block>
            <Block flex middle>
                <Block style={styles.registerContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <ScrollView>
                                {this.state.imageUrls.length > 0 ? 
                                    (<View style={styles.imageView}>
                                        {this.state.imageUrls.map((o, i) => (
                                            <Image key={i} source={{ uri: o }} resizeMode="contain" 
                                            style={{ width: width-30, height: 150, marginBottom: 20 }} />
                                        ))}
                                    </View>) : null
                                }
                                {this.state.videoUrls.length > 0? 
                                    (<View style={styles.imageView}>
                                        {this.state.videoUrls.map((o, i) => (
                                            <Video source={{uri: o}} key={i}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="contain"
                                            shouldPlay={false}
                                            isLooping={false}
                                            useNativeControls={true}
                                            style={{width: width-30, height: 150, marginBottom: 20}} />
                                            ))}
                                    </View>) : null
                                }
                            </ScrollView>
                        </View>
                
                        <View style={{marginTop:'2%'}}>
                            <View style={styles.location}>
                                <Icon style={styles.loginIcon} 
                                    //onPress={() => this.props.navigation.navigate('SearchMap')}  
                                    name="location-pin" family="Entypo" color={'#fc408a'} size={35} />
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
                                {/* <Block middle row style={{margin: 0,padding:0}}>
                                    <Button style={styles.createButton1} onPress={this.handleImageClick}>
                                        <Block row >
                                            <Icon style={styles.btnIcon} name="image" family="Entypo" size={30} />
                                            <Text style={styles.btnText} bold size={14} color={'#00c5e8'}>{'Image'}</Text> 
                                        </Block> 
                                    </Button>
                                    <Button style={styles.createButton1} onPress={this.handleVideoClick}>
                                        <Block row >
                                            <Icon style={styles.btnIcon} name="video" family="Entypo" size={30} />
                                            <Text style={styles.btnText} bold size={14} color={'#00c5e8'}>{'Video'}</Text> 
                                        </Block> 
                                    </Button>
                                    <Button style={styles.createButton} onPress={this.handleSubmit}>
                                        <Text bold size={14} color={'#00c5e8'}>
                                        Submit
                                        </Text>
                                    </Button> 
                                </Block>*/}
                                <Block right row style={{marginTop: 10,padding:0,flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Button style={styles.createButtonNew} onPress={this.handleImageClick}>
                                        <Icon style={styles.btnIcon} name="image" family="Entypo" size={30} />
                                    </Button>
                                    <Button style={styles.createButtonNew} onPress={this.handleVideoClick}>
                                        <Icon style={styles.btnIcon} name="video" family="Entypo" size={30} />
                                    </Button>
                                    <Button style={styles.createButton2} onPress={this.handleSubmit}>
                                        <Text bold size={14} color={'#00c5e8'}>Submit</Text>
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
        //marginRight: 10,
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
        width: width * 0.25,
        marginTop: 10,
        marginRight: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
      },
      createButtonNew: {
        width: width * 0.1,
        marginTop: 10,
        marginRight: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent'
      },
    createButton: {
        width: width * 0.25,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
      },
      createButton2: {
        width: width * 0.25,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        alignSelf: 'flex-end'
        
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

