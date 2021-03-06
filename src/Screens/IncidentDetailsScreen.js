import React from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    FlatList,
    ToastAndroid,
    AsyncStorage
} from "react-native";
import { Icon, Card, Button, Text, Block } from "galio-framework";
//import { LinearGradient } from 'expo';
import TextTicker from "react-native-text-ticker";
import Textarea2 from "react-native-textarea";
import { Input } from "../components";
import { Images, argonTheme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { Video } from "expo-av";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import CameraView from "./CameraView";
import { Cache } from 'react-native-cache';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonNew from 'react-native-flat-button';

const cache = new Cache({
    namespace: 'InciTracker',
    policy: {
        maxEntries: 5000
    },
    backend: AsyncStorage
})

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



class IncidentDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
            submitted: false,
            imageUrl: "",
            videoUrl: "",
            toasterVisible: false,
            toasterMsg: "",
            imageUrls: [],
            videoUrls: [],
            cacheData: null,
            commentImageUrls:[],
            commentVideoUrls:[],
            commentImageUrl:"",
            commentVideoUrl:"",
            incidentDetailsAPI: null,
            isLoaded: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
        this.getCacheValue = this.getCacheValue.bind(this);
        this.updateAPIData = this.updateAPIData.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e, toasterVisible: false });
    }

    handleImageClick() {
        this.getPermissionAsync();
        this._pickImage();
    }

    componentDidMount(){
        this.updateAPIData();
    }

    async updateAPIData(){
        this.setState({ isLoaded : true });
        var inciId = this.props.navigation.state.params.data.incidentId;
        let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
        await fetch(url + '/getLiveIncidentCommentsAndFiles?incidentId='+ inciId)
            .then(response => response.json())
            .then(incidentDetailsAPI => {
                this.setState({ incidentDetailsAPI: incidentDetailsAPI, isLoaded: false })
        })
        console.log("updateAPIData called");
        //this.setState({ isLoaded: false, incidentDetailsAPI: this.state.incidentDetailsAPI });
        console.log(this.state.incidentDetailsAPI);
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
                let urlsArray = this.state.commentImageUrls;
                urlsArray.push(result.uri);
                //console.log(result);
                this.setState({ commentImageUrls: urlsArray, toasterVisible: false });
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
                //this.setState({ videoUrl: result.uri });
                let urlsArrayVideo = this.state.commentVideoUrls;
                urlsArrayVideo.push(result.uri);
                //console.log(result);
                this.setState({ commentVideoUrls: urlsArrayVideo, toasterVisible: false });
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

    async handleSubmit() {
        //alert(this.state.text);
        // if (this.state.text == '') {
        //     alert('Please type in comments');
        //     return;
        // }

        if (this.state.text == "") {
            this.setState({
                toasterVisible: true,
                toasterMsg: "Please type in comments",
            });
            return;
        }

        this.setState({ submitted: true, isLoaded: true });
        
        // if (this.props.navigation.state.params.callback != undefined) {
        //     this.props.navigation.state.params.callback(
        //         this.props.navigation.state.params.data,
        //         this.state.text,
        //         this.state.commentImageUrls,
        //         this.state.commentVideoUrls
        //     );
        // }
        
        await this.props.navigation.state.params.callback(
            this.props.navigation.state.params.data,
            this.state.text,
            this.state.commentImageUrls,
            this.state.commentVideoUrls
        );

        console.log("Calling after callback ****************************** ");
        
        this.updateAPIData();

        this.setState({
            toasterVisible: true,
            toasterMsg: "Incident Updated Successfully",
            text: "",
            imageUrls: [],
            videoUrl: [],
            commentVideoUrls: [],
            commentImageUrls: [],
            //isLoaded: false
        });
    }
    
    async getCacheValue(key){
        var getCacheValue = await this.props.navigation.state.params.getIncidentDetails(key);
        //console.log("getCacheValue");
        //console.log(getCacheValue);
        this.setState({cacheData : getCacheValue});
    }


    render() {
        //alert(this.props.navigation.state.params.title);
        var incident = this.props.navigation.state.params.data;
        let inciAPI = this.state.incidentDetailsAPI;
        //console.log("Render");
        //console.log(inciAPI);
        //console.log(incident.incidentId);
        // console.log("Incident Id");
        // //var fromCache = this.props.navigation.state.params.fromCache;
        //var fromCache = this.getCacheValue(incident.incidentId);
        //console.log("From Cache");
        let fromCache =  this.props.navigation.state.params.manualCache;
        //console.log("fromCache");
        //console.log(fromCache);
        //console.log(this.props.navigation.state.params.getIncidentDetails(incident.incidentId));
        // var valueFromCache = _.filter(fromCache, {'key' : incident.incidentId});
        // if(valueFromCache != null && valueFromCache != undefined && valueFromCache.length > 0)
        //     valueFromCache = valueFromCache[0].incident;
        
        
        //console.log(valueFromCache);
        //if(this.state.submitted)
        //incident.comments.push({id:1,name:'User 2', text: this.state.text});

        return (
            <View style={styles.container}>
                {this.state.toasterVisible ? (
                    <Toast
                        visible={this.state.toasterVisible}
                        message={this.state.toasterMsg}
                    />
                ) : null}
                <Spinner visible={this.state.isLoaded} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Block style={{ backgroundColor: "#0A121A", width, height, zIndex: 1 }}>
                    <Block style={{ backgroundColor: "#00c5e8" }} middle>
                        <Text style={styles.profileText}>Incident Details</Text>
                    </Block>
                    <Text style={{ borderWidth: 6, borderColor: "#0A121A", height: 1 }}></Text>
                    <Block style={{ backgroundColor: "#1d2123"}} middle>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text h5 style={styles.horizontalTextOffence}>
                                {incident.offenceName.toUpperCase()}
                            </Text>
                        </View>
                    </Block>
                    <Text style={{ borderWidth: 6, borderColor: "#0A121A", height: 1 }}></Text>
                    <Block flex middle>
                        <ScrollView style={styles.registerContainer}>
                            <View style={styles.desc}>
                                <Text style={styles.MessageText}>{incident.description}</Text>
                            </View>
                            {/* {valueFromCache != null && valueFromCache.imageUrls != null && 
                                valueFromCache.imageUrls.length > 0 ? (
                                <View style={styles.imageView}>
                                    {valueFromCache.imageUrls.map((o, i) => (
                                        <Image
                                            key={i}
                                            source={{ uri: o }}
                                            resizeMode="contain"
                                            style={{ width: width-30, height: 150, marginBottom: 20 }}
                                        />
                                    ))}
                                </View>
                            ) : null} */}
                            {inciAPI != null && inciAPI.incidentImageUrls != null && 
                                inciAPI.incidentImageUrls.length > 0 ? (
                                <View style={styles.imageView}>
                                    {inciAPI.incidentImageUrls.map((o, i) => (
                                        <Image
                                            key={i}
                                            source={{ uri: o }}
                                            resizeMode="contain"
                                            style={{ height: 200, marginBottom: 20 }}
                                        />
                                    ))}
                                </View>
                            ) : null}
                            {/* {valueFromCache != null && valueFromCache.videoUrls != null && 
                                valueFromCache.videoUrls.length > 0 ? (
                                <View style={styles.imageView}>
                                    {valueFromCache.videoUrls.map((o, i) => (
                                        <Video
                                            source={{ uri: o }}
                                            key={i}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="contain"
                                            shouldPlay={false}
                                            isLooping={false}
                                            useNativeControls={true}
                                            style={{ width: width-30, height: 150, marginBottom: 20 }}
                                        />
                                    ))}
                                </View>
                            ) : null} */}
                            {inciAPI != null && inciAPI.incidentVideoUrls != null && 
                                inciAPI.incidentVideoUrls.length > 0 ? (
                                <View style={styles.imageView}>
                                    {inciAPI.incidentVideoUrls.map((o, i) => (
                                        <Video
                                            source={{ uri: o }}
                                            key={i}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            resizeMode="contain"
                                            shouldPlay={false}
                                            isLooping={false}
                                            useNativeControls={true}
                                            style={{ height: 150, marginBottom: 20 }}
                                        />
                                    ))}
                                </View>
                            ) : null}
                            <Text
                                style={{ borderWidth: 2, borderColor: "#0A121A", height: 1 }}
                            ></Text>
                            {inciAPI != undefined && inciAPI.comments != null && 
                                inciAPI.comments.length > 0 ? (
                                    inciAPI.comments != null && inciAPI.comments.length > 0 ? (
                                        inciAPI.comments.map((com, i) => (
                                            <ScrollView>
                                                <Text style={styles.MessageText2}>{"Shashi"}</Text>
                                                    {com.incidentCommentImageUrls.length > 0 ? (
                                                        com.incidentCommentImageUrls.map((o, i) => (
                                                            <Image
                                                                source={{ uri: o }}
                                                                resizeMode="contain"
                                                                style={{ marginLeft: "5%", width: 150, height: 150 }}
                                                            /> ))
                                                    ) : null}
                                                    {com.incidentCommentVideoUrls != undefined && com.incidentCommentVideoUrls.length > 0 ? (
                                                        com.incidentCommentVideoUrls.map((o, i) => (
                                                        <Video
                                                            source={{ uri: o }}
                                                            rate={1.0}
                                                            volume={1.0}
                                                            isMuted={false}
                                                            resizeMode="contain"
                                                            shouldPlay={false}
                                                            isLooping={false}
                                                            useNativeControls={true}
                                                            style={{ marginLeft: "5%", width: 150, height: 150 }}
                                                        /> ))
                                                    ) : null}
                                                    <Text style={styles.MessageText1}>{com.comments}</Text>
                                                </ScrollView>
                                            ))
                                    ) : null
                                ) : null
                            }

                            <ScrollView>
                                <Text
                                    style={{ borderWidth: 2, borderColor: "#0A121A", height: 1 }}
                                ></Text>
                                <View style={{ marginTop: 5 }}>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            marginLeft: "2%",
                                            marginRight: "2%",
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Textarea2
                                            id="textAreaId"
                                            containerStyle={styles.textareaContainer}
                                            style={styles.textarea}
                                            maxLength={120}
                                            value={this.state.text}
                                            placeholderTextColor={"black"}
                                            placeholder={"Add Comments"}
                                            underlineColorAndroid={"transparent"}
                                            onChangeText={(text) => this.handleChange(text)}
                                        />
                                        <Block row>
                                            {this.state.commentImageUrls.length > 0  ? 
                                                this.state.commentImageUrls.map((eachImage, i) => (
                                                    <Image
                                                        key={i}
                                                        source={{ uri: eachImage }}
                                                        resizeMode="contain"
                                                        style={{ marginLeft: "5%", width: 50, height: 50 }}
                                                    />) 
                                                    ) : null }
                                            {this.state.commentVideoUrls.length > 0  ? 
                                                this.state.commentVideoUrls.map((eachVideo, j) => (
                                                    <Video
                                                        key={j}
                                                        source={{ uri: eachVideo }}
                                                        rate={1.0}
                                                        volume={1.0}
                                                        isMuted={false}
                                                        resizeMode="contain"
                                                        shouldPlay={false}
                                                        isLooping={false}
                                                        useNativeControls={true}
                                                        style={{ marginLeft: "5%", width: 50, height: 50 }}
                                                    />)
                                                ) : null}
                                        </Block>
                                        {/* <Block middle row style={{ margin: 0, padding: 0, alignItems: "flex-end" }}>
                                            <Button style={styles.createButton1} onPress={this.handleImageClick}>
                                                <Block row>
                                                    <Icon style={styles.btnIcon} name="image" family="Entypo" size={30}/>
                                                    <Text style={styles.btnText} bold size={14} color={"#00c5e8"}>{"Image"}</Text>
                                                </Block>
                                            </Button>
                                            <Button style={styles.createButton1} onPress={this.handleVideoClick}>
                                                <Block row>
                                                    <Icon style={styles.btnIcon} name="video" family="Entypo" size={30}/>
                                                    <Text style={styles.btnText} bold size={14} color={"#00c5e8"}>{"Video"}</Text>
                                                </Block>
                                            </Button>
                                            <Button style={styles.createButton} onPress={this.handleSubmit}>
                                                <Text bold size={14} color={"#00c5e8"}>Post Comment</Text>
                                            </Button>
                                        </Block> */}
                                        <Block right row style={{marginTop: 5, marginBottom:30,  padding:0,flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Button style={styles.createButtonNew} onPress={this.handleImageClick}>
                                                <Icon style={styles.btnIcon} name="image" family="Entypo" size={30} />
                                            </Button>
                                            <Button style={styles.createButtonNew} onPress={this.handleVideoClick}>
                                                <Icon style={styles.btnIcon} name="video" family="Entypo" size={30} />
                                            </Button>
                                            {/* <Button style={styles.createButton3} onPress={this.handleSubmit}>
                                                <Text bold size={14} color={'#00c5e8'}>Submit</Text>
                                            </Button> */}
                                            <ButtonNew
                                                type="custom" 
                                                containerStyle={{ //marginTop: 1, 
                                                    marginLeft: 15,
                                                    height: 40,
                                                    backgroundColor: 'black', 
                                                    fontSize: 18,
                                                    width: width *.25
                                                    }}
                                                contentStyle={{ color: '#00c5e8' }}
                                                onPress={() => this.handleSubmit()}>
                                                Submit
                                            </ButtonNew>
                                        </Block>
                                    </View>
                                </View>
                            </ScrollView>
                        </ScrollView>
                    </Block>
                </Block>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    createButtonNew: {
        width: width * 0.1,
        marginTop: 10,
        marginRight: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent'
    },
    root: {
        height: 200,
        //padding: 5,
        backgroundColor: "#fff",
        //borderRadius:10,
        margin: 20,
    },
    createButton3: {
        width: width * 0.25,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: 'transparent',
        alignSelf: 'flex-end'
        
      },
    createButton2: {
        width: width * 0.25,
        justifyContent: "center",
        marginTop: 20,
        height: 30,
        marginLeft: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 8,
        backgroundColor: "#26ceeb",
    },
    submitBtn: {
        width: width * 0.25,
        marginTop: 15,
        //backgroundColor: '#5E72E4'
        backgroundColor: "transparent",
        borderColor: "#00c5e8",
        borderWidth: 1,
    },

    listContainer: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    listContent: {
        marginLeft: 16,
        flex: 1,
    },
    listContentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC",
    },
    container: {
        flex: 1,
    },
    desc: {
        marginTop: 20,
        height: height * 0.25,
        flexDirection: "row",
        borderBottomWidth: 10,
        borderBottomColor: "#0A121A",
    },
    commentView: {
        height: height * 0.45,
        flexDirection: "row",
    },
    comments: {
        marginTop: 10,
        height: 160,
        //flexDirection: "column",
        backgroundColor: "#1D2123",
    },
    imageView: {
        marginTop: "2%",
        flexDirection: "column",
        backgroundColor: "#1D2123",
    },
    btnIcon: {
        color: "#00c5e8",
        //marginRight: 10,
    },
    btnText: {
        marginLeft: 5,
        marginTop: 5,
    },
    createButton1: {
        width: width * 0.25,
        marginTop: 10,
        marginRight: 5,
        //backgroundColor: '#5E72E4'
        backgroundColor: "transparent",
        borderColor: "#00c5e8",
        borderWidth: 1,
    },
    createButton: {
        width: width * 0.3,
        marginTop: 10,
        //backgroundColor: '#5E72E4'
        backgroundColor: "transparent",
        borderColor: "#00c5e8",
        borderWidth: 1,
    },
    gradient: {
        flex: 1,
    },
    gradientJob: {
        marginLeft: "5%",
        marginRight: "5%",
        height: "20%",
        borderRadius: 15,
    },
    profileText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "black",
        marginTop: "2%",
        marginLeft: "5%",
        marginBottom: "2%",
    },
    jobCard: {
        height: "100%",
        borderColor: "transparent",
    },
    horizontalText: {
        fontWeight: "700",
        color: "black",
        marginLeft: "5%",
        marginTop: "1%",
        paddingBottom: "3%",
    },
    horizontalTextOffence: {
        fontWeight: "700",
        color: "orange",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "1%",
        paddingBottom: "3%",
    },
    spacebar: {
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "1%",
        paddingBottom: "1%",
    },
    tickerText: {
        color: "black",
        backgroundColor: "red",
    },
    horizontalButton: {
        borderRadius: 230,
        width: "5%",
        justifyContent: "space-between",
        marginTop: "1%",
    },
    img1S1: {
        height: 75,
        width: 75,
        borderRadius: 35,
    },
    MessageText: {
        alignSelf: "flex-start",
        fontWeight: "700",

        color: "#fff",
        marginLeft: "5%",
        marginTop: "2%",
    },
    MessageText2: {
        alignSelf: "flex-start",
        fontWeight: "700",
        textDecorationLine: "underline",
        color: "#18b6e7",
        marginLeft: "5%",
        marginTop: "2%",
    },
    MessageText1: {
        alignSelf: "flex-start",
        //color: '#18b6e7',
        color: "#fff",
        marginLeft: "5%",
        marginTop: "2%",
        marginBottom: "2%",
    },
    loginCard: {
        marginLeft: "5%",
        marginRight: "5%",
        backgroundColor: "#680d64",
        borderColor: "transparent",
    },
    loginIcon: {
        paddingLeft: "7%",
        marginBottom: "5%",
        marginTop: "5%",
    },
    textLogin: {
        fontSize: 15,
        fontWeight: "400",
        color: "#fff",
        alignSelf: "center",
        paddingLeft: "5%",
        marginBottom: "3%",
    },
    locationCard: {
        marginLeft: "5%",
        marginRight: "5%",
        backgroundColor: "#680d64",
        borderColor: "transparent",
    },
    locationIcon: {
        paddingLeft: "7%",
        marginTop: "6%",
    },
    locationText: {
        fontSize: 15,
        fontWeight: "400",
        color: "grey",
        alignSelf: "center",
        marginTop: "2%",
        paddingLeft: "5%",
    },
    textRow1: {
        color: "grey",
        marginRight: "5%",
        marginTop: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
    },
    textRow2: {
        color: "grey",
        marginRight: "5%",
        marginTop: "3%",
        paddingBottom: "3%",
        fontWeight: "bold",
    },
    firstCardImg: {
        borderRadius: 25,
        marginLeft: "5%",
        width: 50,
        height: 50,
    },
    Mao: {
        color: "black",
        fontWeight: "bold",
        marginLeft: "15%",
        // paddingTop:'2%'
    },
    maoIcon: {
        // paddingBottom:'40%',
        // marginTop:'2%'
    },
    Designer: {
        color: "grey",
        marginLeft: "15%",
        marginBottom: "25%",
    },
    badge: {
        // marginTop:'5%'
    },
    textareaContainer1: {
        height: 40,
        padding: 5,
        marginBottom: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    textarea1: {
        textAlignVertical: "top", // hack android
        height: 40,
        fontSize: 12,
        color: "black",
    },
    textareaContainer: {
        height: height * 0.1,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    registerContainer: {
        width: width * 0.9,
        height: height * 0.7,
        backgroundColor: "#1d2123",
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden",
    },
    textarea: {
        textAlignVertical: "top", // hack android
        //height: 110,
        fontSize: 12,
        color: "black",
    },
    submitButton: {
        backgroundColor: "#fc408a",
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: "black",
    },
    friendsView: {
        marginTop: "1%",
        paddingBottom: "5%",
    },
    friends: {
        borderRadius: 100,
        alignSelf: "center",
        // marginTop:'4%',
    },
});

export default IncidentDetailsScreen;
