import React from 'react';
import {StyleSheet, View,  ScrollView,Image , TouchableOpacity, ImageBackground, Dimensions, FlatList} from 'react-native';
import { Icon,Card,Button, Text, Block} from 'galio-framework';
//import { LinearGradient } from 'expo';
import TextTicker from 'react-native-text-ticker';
import Textarea2 from 'react-native-textarea';
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';

const { width, height } = Dimensions.get("screen");

class Screen2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            title: '',
            submitted: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
  
    }
    handleChange(e){
        this.setState({text: e});
    }

    handleImageClick(){
        //this.getPermissionAsync();
        //this._pickImage();
    }
    handleSubmit(){
        //alert(this.state.text);
        if(this.state.text == '') 
        {
            alert('Please type in comments');
            return;
        }
        this.setState({submitted : true});
        if(this.props.navigation.state.params.callback != undefined)
        {
            this.props.navigation.state.params.callback(this.props.navigation.state.params.data.title,
                this.state.text);
        }
        this.setState({text: ''});
    }
    render() {
      //alert(this.props.navigation.state.params.title);
      var incident = this.props.navigation.state.params.data;
      //if(this.state.submitted)
        //incident.comments.push({id:1,name:'User 2', text: this.state.text});
      return (
        
    <View style={styles.container}>
        <Block style={{backgroundColor: '#0A121A', width, height, zIndex: 1}}>
            <Block style={{backgroundColor: '#00c5e8'}} middle>
                <Text style={styles.profileText}>Incident Details</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text h5 style={styles.horizontalText}>{incident.title}</Text>
                </View>
            </Block>
            <Block flex middle>
                <Block style={styles.registerContainer}>
                    <View style={styles.desc}>
                        <Text style={styles.MessageText}>{incident.desc}</Text>
                    </View>
                    <ScrollView>
                        <ScrollView style={styles.comments}>
                            {incident.comments.map((com, i) => (
                                <View key={i}>
                                    <Text style={styles.MessageText2}>{com.name}</Text>
                                    <Text style={styles.MessageText1}>
                                        {com.text}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Text style={{borderWidth: 2, borderColor: '#0A121A', height: 1}}></Text>
                        <View style={{marginTop:5}}>
                            <View style={{
                                    flexDirection:'column',
                                    marginLeft:'2%',
                                    marginRight:'2%',
                                    borderRadius:5,
                                }}>
                                <Textarea2
                                    id="textAreaId"
                                    containerStyle={styles.textareaContainer}
                                    style={styles.textarea}
                                    maxLength={120}
                                    value={this.state.text}
                                    placeholderTextColor={'black'}
                                    placeholder={'Add Comments'}
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
                                        Post Comment
                                        </Text>
                                    </Button>
                                </Block>
                            </View>
                        </View>
                    </ScrollView>
                </Block>
            </Block>
        </Block>
    </View>
    );
    }
  }

const styles = StyleSheet.create({
    root: {
        height: 200,
        //padding: 5,
        backgroundColor: '#fff',
        //borderRadius:10,
        margin: 20
    },
    createButton2: {
        width: width * 0.25,
        justifyContent: 'center',
        marginTop: 20,
        height: 30,
        marginLeft: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#26ceeb'
    },
    submitBtn: {
        width: width * 0.25,
        marginTop: 15,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        borderColor: '#00c5e8',
        borderWidth: 1
    },

    listContainer: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
    listContent: {
        marginLeft: 16,
        flex: 1,
    },
    listContentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    name:{
        fontSize:16,
        fontWeight:"bold",
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    container:{
        flex:1
    },
    desc:{
      marginTop:20,
      height:height*0.25,
      flexDirection:'row',
      borderBottomWidth: 10,
      borderBottomColor: '#0A121A'
    },
    commentView:{
        height:height*0.45,
        flexDirection:'row',
    },
    comments:{
        marginTop:10,
        height:160,
        flexDirection:'column',
        backgroundColor: '#1D2123'
      },
      btnIcon:{
        color: '#00c5e8',
        marginRight: 10,
    },
    btnText:{
        marginLeft: 5,
        marginTop: 5,
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
        marginTop:'1%',
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
    MessageText2:{
        alignSelf:'flex-start',
        fontWeight:'700',
        
        color:'#18b6e7',
        marginLeft:'5%',
        marginTop:'2%',
            
    },
    MessageText1:{
        alignSelf:'flex-start',
        color:'#18b6e7',
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
        height: 60,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius:10,
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

export default Screen2; 

