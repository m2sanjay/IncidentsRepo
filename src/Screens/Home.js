import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ActivityIndicator, ToastAndroid, AsyncStorage } from 'react-native';
import { Text, Block } from 'galio-framework';
import TextTicker from 'react-native-text-ticker';
import SearchMap from "./SearchMap.js";
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import _, { filter } from 'lodash';

import AddIncidentPopUp from './AddIncidentPopUp';
//import { Cache } from 'react-native-cache';

import axios from 'axios';

const { width, height } = Dimensions.get("screen");

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(props.message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 150);
        return null;
    }
    return null;
};

// const cache = new Cache({
//     namespace: 'InciTracker',
//     policy: {
//         maxEntries: 5000
//     },
//     backend: AsyncStorage 
// })

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: '',
            tickerArray: [],
            heatData: 0,
            visibleModal: false,
            newCoords: null,
            isLoaded: true,
            error: null,
            toasterVisible: false,
            toasterMsg: '',
            liveIncidents: [],
            createdIncidentId: null,
            manualCache:[],
            showHistory: false,
            tempCmtId: '',
            selectedTicker: []
        }
        this.callbackFn = this.callbackFn.bind(this);
        this.callbackMapFn = this.callbackMapFn.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderModalContent = this.renderModalContent.bind(this);
        this.enableModalFn = this.enableModalFn.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.callbackPopUp = this.callbackPopUp.bind(this);
        this.callbackPopUpAPI = this.callbackPopUpAPI.bind(this);
        this.updateTicker = this.updateTicker.bind(this);
        this.updateData = this.updateData.bind(this);
        this.getUpdatedHeat = this.getUpdatedHeat.bind(this);
        this.getLiveIncident = this.getLiveIncident.bind(this);
        this.selectedTickerFn = this.selectedTickerFn.bind(this);
    }

    updateData(latitude, longitude){
       this.setState({ isLoaded : true, selectedTicker : [] });
       console.log(latitude);
       console.log(longitude);
       let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
       //let url = 'http://192.168.1.14:8080';
       // console.log("Getting HeatMap Data from DB");
       // console.log(latitude, longitude); http://incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com/
        fetch(url + '/getCount?lat=' + latitude + '&lng=' + longitude)
            .then(res => res.json())
            .then(
              (heatData) => {
                this.setState({
                  //isLoaded: false,
                  heatData: heatData,
                  toasterVisible: false
                });
              },
              (error) => {
                this.setState({
                  //isLoaded: false,
                  toasterVisible: false,
                  error
                });
              }
        );

        fetch(url + '/getTickerListByLatLngAndDays?lat=' + latitude +
            '&lng=' + longitude + '&noOfDays=' + 15)
            .then(response => response.json())
            .then(tickerArray => {
                this.setState({ tickerArray: tickerArray, 
                    toasterVisible: false })
            },
            (error) => {
                this.setState({
                  //isLoaded: false,
                  toasterVisible: false,
                  error
                });
              }
        );
        
        // fetch('http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com/getTickerListByLatLngFormatted?lat=' + latitude + '&lng=' + longitude)
        // .then(res => res.json())
        // .then(
        //   (tickerArray) => {
        //     this.setState({
        //       //isLoaded: false,
        //       tickerArray: tickerArray,
        //       toasterVisible: false
        //     });
        //   },
        //   (error) => {
        //     this.setState({
        //       //isLoaded: false,
        //       toasterVisible: false,
        //       error
        //     });
        //   }
        // );
        
        fetch( url + '/getLiveIncidentsListByLatLngFormatted?lat=' + latitude + '&lng=' + 
            longitude)// + '&noOfDays=7')
            .then(res => res.json())
            .then(
              (liveIncidents) => {
                this.setState({
                  isLoaded: false,
                  liveIncidents: liveIncidents,
                  toasterVisible: false
                });
              },
              (error) => {
                this.setState({
                  isLoaded: false,
                  toasterVisible: false,
                  error
                });
              }
        );
    }

    selectedTickerFn(offenceName){
        //console.log(offenceName);
        let tickArray = this.state.selectedTicker;
        if(tickArray.length == 0){
            tickArray.push(offenceName);
        } else {
            let index = _.indexOf(tickArray, offenceName);
            if(index < 0){
                tickArray.push(offenceName);
            } else {
                _.remove(tickArray, function(n) {
                    return n == offenceName;
                });
            }
        }

        this.state.selectedTicker = tickArray;
        this.setState({selectedTicker: this.state.selectedTicker});
        
    }

    updateTicker(latitude, longitude) {
        // fetch('http://192.168.1.14:8080/getIncidentsListByLatLngFormatted?lat=' + latitude + '&lng=' + longitude)
        //     .then(response => response.json())
        //     .then(tickerArray => {
        //         this.setState({ tickerArray })
        //     })
    }

    async callbackFn(incident, commentText, imageUrls, videoUrls) {

        //console.log("callbackFn called");
        var postJson3 = {
            incidentId:incident.incidentId,							//should be null
            commentId: null,
            comments: commentText,
            incidentCommentImageUrls: imageUrls,
            incidentCommentVideoUrls: videoUrls
        }

        let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
        //let url = 'http://192.168.1.14:8080';
        console.log(postJson3);
        
        await fetch(url + '/addComments/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postJson3)
            }
        ).then(res => res.text())
         .then(
          (tempCmtId) => {
           this.setState({tempCmtId : tempCmtId});
        });
        
        console.log("Comment Id");
        console.log(this.state.tempCmtId);

        var key = this.state.tempCmtId;
        console.log(imageUrls);
        for(let i=0; i <imageUrls.length; i++){
            var formData = new FormData();
            var imagedata = imageUrls[i];
            var imageFileName = 'CommentsImage_'+ i +'.jpeg';
            formData.append('fileData', { uri : imagedata, name : imageFileName, type: 'image/jpeg'});

            await axios({
                url: `${url}/addIncidentCommentFile?cmntId=${key}`,
                method: "POST",
                data: formData,
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
            })
        }

        
        for(let j=0; j<videoUrls.length; j++){
            var formData = new FormData();
            var videoData = videoUrls[j];
            var videoFileName = 'CommentsImage'+ j +'.mp4';
            formData.append('fileData', { uri : videoData, name : videoFileName, type: 'video/mp4'});

            await axios({
                url: `${url}/addIncidentCommentFile?cmntId=${key}`,
                method: "POST",
                data: formData,
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
            })
        }
        
        console.log("Comments File saved");
        //Saving files 
        // for(let i=0; i < imageUrls.length ; i++){
        //     let localUrl = imageUrls[i];
        //     let fileName =  localUrl.split('/').pop();
        //     let formData = new FormData();

        //     // console.log(localUrl);
        //     // console.log(fileName);
        //     // console.log(imageUrls.length);

        //     formData.append('photo' , { uri: localUrl, name: fileName, type: 'image'} );
        //     return fetch('http://192.168.1.14:8080/addImage?incId='+ incident.incidentId ,{
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'content-type' : 'multipart/form-data'
        //         }
        //     });
        // }

        // console.log("Image Req submitted");
        /*
        let node = _.filter(this.state.tickerArray, function (o) {
            if (o.title == title)
                return o;
        });

        */

        //var valueFromCache = _.filter(this.state.manualCache, {'key' : incident.incidentId});
        //console.log(valueFromCache);
        /*
        if(valueFromCache.length == 0){
            var obj = { key : incident.incidentId, incident: 
                { 
                    comments :
                        [
                            {name: "Shashi", text: commentText, 
                            imageUrls: imageUrls,
                            videoUrls: videoUrls }
                        ]
                }
            };
            this.state.manualCache.push(obj);
        } else {
            var existingObject = valueFromCache[0].incident;
            let existingComments = existingObject.comments;
            existingComments.push({
                    name: 'Shashi', text: commentText, 
                    imageUrls: imageUrls,
                    videoUrls: videoUrls
            });
            this.state.manualCache.push(existingObject);
        }
        */
        //let existingComments = valueFromCache.comments;
        // let length = existingComments.length + 1;
        // existingComments.push({
        //     id: '' + length, name: 'New User', text: commentText, imageUrls: imageUrl,
        //     videoUrls: videoUrl
        // });

        //this.setState({ manualCache: this.state.manualCache });
        // */

    }

    callbackMapFn(objTitle) {
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
        this.setState({ tickerArray: tempArray });
    }

    callbackPopUp(selectedDrpDwn, description, selImages, selVideos) {
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
        this.setState({ tickerArray: existingArray });
    }

    async callbackPopUpAPI(postJson, createOrUpdate) {

        this.setState({ isLoaded: true });
        let url = 'http://Incitrackerrepo-env.eba-2mukkhzp.us-east-2.elasticbeanstalk.com';
        //let url = 'http://192.168.1.14:8080';
        await fetch(url + '/addIncident/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postJson)
            }

        ).then(res => res.json())
         .then(
           (createdIncidentId) => {
            this.setState({createdIncidentId : createdIncidentId});
        });

        let key = this.state.createdIncidentId;
        console.log("Key");
        console.log(key);
        console.log(postJson);

        for(let i=0; i<postJson.imageUrls.length; i++){
            var formData = new FormData();
            var imagedata = postJson.imageUrls[i];
            var incidentImageName = 'IncidentImage_' + i + '.jpg'; 
            formData.append('fileData', { uri : imagedata, name : incidentImageName, type: 'image/jpeg'});

            await axios({
                url: `${url}/addIncidentFile?incId=${key}`,
                method: "POST",
                data: formData,
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
            })
        }
        
        for(let j=0; j<postJson.videoUrls.length; j++){
            var formData = new FormData();
            var videoData = postJson.videoUrls[j];
            var incidentVideoName = 'IncidentVideo_' + j + '.mp4'; 
            formData.append('fileData', { uri : videoData, name : incidentVideoName, type: 'video/mp4'});

            await axios({
                url: `${url}/addIncidentFile?incId=${key}`,
                method: "POST",
                data: formData,
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
            })
        }
        
        /*
        
        fetch(`${url}/addIncidentFile?incId=${key}&fileData=${JSON.stringify(data)}`, {
            method: "POST",
            headers: {
                'content-type' : 'multipart/form-data'
            },
            body: JSON.stringify(data)
            }).then(function (res) {
            if (res.ok) {
                console.log("Perfect! ");
            } else if (res.status == 401) {
                console.log("Oops! ");
            } else {
                console.log("res : " + res);
            }
            }
        );
        */

        // await cache.set(key , {
        //     imageUrls : postJson.imageUrls,
        //     videoUrls : postJson.videoUrls,
        //     comments : postJson.comments 
        // });

        AsyncStorage.setItem(''+key, JSON.stringify(postJson));

        var obj = { key : key,
                    incident: postJson};
        this.state.manualCache.push(obj);


        
        //console.log(this.state.manualCache);
        //this.setState({ manualCache: this.state.manualCache })
        // const value = await AsyncStorage.getItem(''+key);
        // console.log("Value from AsyncStrore.get(key)");
        // console.log(value);

        this.setState({
            manualCache: this.state.manualCache,
            toasterVisible: true,
            isLoaded: true,
            toasterMsg: "Incident Added Successfully",
        });

        this.updateData(postJson.latitude, postJson.longitude);

    }


    async getIncidentFromCache(key){
        var obj = await AsyncStorage.getItem(''+key);
        console.log("Getting the value from Cache");
        //console.log(obj);
        return obj;
    }

    // async getValueCache(key){
    //     return await cache.get(key);
    // }

    navigate(screen, incDetails) {

        if (screen == 'AddIncident') {
            this.props.navigation.navigate(screen, { data: incDetails, callback: this.callbackMapFn });
        } else {
            this.props.navigation.navigate(screen, { data: incDetails, callback: this.callbackFn });
        }

        //this.props.navigation.navigate(screen, {data: coords, callback: this.callbackMapFn});
    }

    enableModalFn(screen, markerCoords) {
        this.setState({ visibleModal: true, newCoords: markerCoords });
    };

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    closePopUp() {
        this.setState({ visibleModal: false });
    }

    renderModalContent = () => (
        <Block>
            <AddIncidentPopUp
                closePopUp={this.closePopUp.bind(this)}
                createIncident={this.callbackPopUpAPI.bind(this)}
                coordinate={this.state.newCoords.data}
                selectedAddress={this.state.newCoords.selectedAddress}
                updateExisting={this.state.newCoords.updateExisting}
                existingIncidents={this.state.newCoords.existingIncidents}
            />
        </Block>
    );

    getUpdatedHeat(){
        this.state.toasterVisible = false;
        return this.state.heatData;
    }


    getLiveIncident(){
        console.log("Live Incidents " );
        //console.log(this.state.selectedTicker);
        let filteredIncidentsToReturn = [];
        let filteredIncidents1 = [];
        //let filteredIncidents2 = [];
        let selTicker = this.state.selectedTicker;
        let allIncidents = this.state.liveIncidents;
        //filteredIncidents = _.filter(this.state.liveIncidents, ['offenceName', 'rape']);
        //filteredIncidents = _.pullAllWith(this.state.liveIncidents, [{ 'offenceName': 'violent-crime'}]);
        
        console.log(selTicker);
        if(selTicker.length > 0){
            selTicker.map((eachType, i) => {
                filteredIncidents1 = _.filter(allIncidents, function(o) { 
                    return o.offenceName == eachType; 
                });
                //console.log(filteredIncidents1);
                filteredIncidentsToReturn = filteredIncidentsToReturn.concat(filteredIncidents1);
                //console.log(filteredIncidentsToReturn);
            });
            
            // filteredIncidents1 = _.filter(this.state.liveIncidents, function(o) { 
            //     return o.offenceName == 'violent-crime'; 
            // });
            
            // filteredIncidents2 = _.filter(this.state.liveIncidents, function(o) { 
            //     return o.offenceName == 'rape'; 
            // });
    
            //console.log(filteredIncidentsToReturn);
            //console.log(filteredIncidents1.concat(filteredIncidents2));
            //console.log(filteredIncidents2);
            
            return filteredIncidentsToReturn;
        } else {
            return allIncidents;
        }
        
    }

    updateImages(){

    }

    render() {

        //let liveIncidents = this.state.liveIncidents;
        let tickerArray = this.state.tickerArray;
        // console.log("Ticker Data");
        // console.log(liveIncidents);

        return (

            <View style={styles.container}>
                {this.state.toasterVisible ?
                    <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg}/>: null 
                }
                <Block style={{ backgroundColor: '#0A121A', width, height, zIndex: 1 }}>
                    <Block style={{ backgroundColor: '#00c5e8' }} middle>
                        <Text style={styles.profileText}>Incident Tracker</Text>
                    </Block>
                    <View style={{ height: 50  }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {tickerArray.length > 0 ?
                                <TextTicker style={{ height: 50, marginTop: 25, marginBottom:25, fontSize: 17, 
                                     }}
                                    //duration={10000} bounce={false}
                                    loop={true}
                                    //scrollSpeed={3000}
                                    scrollSpeed={3000}
                                >

                                    {tickerArray.map((incident, i) => (
                                            <Text style={{ 
                                                color: 
                                                _.indexOf(this.state.selectedTicker, incident.offenceName) < 0 ?
                                                'orange' : 'black',
                                                backgroundColor: _.indexOf(this.state.selectedTicker, incident.offenceName) < 0 ?
                                                'transparent' : 'orange',
                                            }} 
                                                key={i} 
                                                // onPress={() => this.props.navigation.navigate('TickerFlatList', 
                                                //  { data: this.getLiveIncident.bind(this) })}
                                                onPress={() => this.selectedTickerFn(incident.offenceName)}

                                                >
                                                {' ' + incident.offenceName + '(' + incident.count + ') '}
                                            </Text>
                                        ))} 
                                </TextTicker> : 
                                <Text style={{ height: 50, padding: 15, fontSize: 17, 
                                    backgroundColor: 'black', color: 'orange' }}> 
                                    No live Incident in selected area 
                                </Text>
                                }
                            </View>
                        </View>
                    </View>
                    <Spinner visible={this.state.isLoaded} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <SearchMap
                        navigateTo={this.navigate.bind(this)}
                        heatData={this.getUpdatedHeat.bind(this)}
                        liveIncidents={this.getLiveIncident.bind(this)}
                        enableModal={this.enableModalFn.bind(this)}
                        updateTicker={this.updateTicker.bind(this)}
                        updateData={this.updateData.bind(this)}
                        selectedTicker={this.state.selectedTicker} />
                    {this.state.visibleModal == true ?
                        <View style={{ marginTop: '50%', height: height * .5 }}>
                            <Modal isVisible={this.state.visibleModal}>
                                {this.renderModalContent()}
                            </Modal>
                        </View> : null}
                </Block>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    add: {
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
    gradient: {
        flex: 1
    },
    gradientJob: {
        marginLeft: '5%',
        marginRight: '5%',
        height: '20%',
        borderRadius: 15
    },
    profileText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        marginTop: '2%',
        marginLeft: '5%',
        marginBottom: '2%'
    },
    jobCard: {
        height: '100%',
        borderColor: 'transparent',

    },
    horizontalText: {
        fontWeight: '700',
        color: 'black',
        marginLeft: '5%',
        marginTop: '3%',
        paddingBottom: '3%',

    },
    tickerText: {
        color: 'black',
        backgroundColor: 'red'

    },
    horizontalButton: {
        borderRadius: 230,
        width: '5%',
        justifyContent: 'space-between',
        marginTop: '1%',
    },
    img1S1: {
        height: 75,
        width: 75,
        borderRadius: 35,

    },
    MessageText: {
        alignSelf: 'flex-start',
        fontWeight: '700',

        color: '#fff',
        marginLeft: '5%',
        marginTop: '2%',

    },
    loginCard: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#680d64',
        borderColor: 'transparent'

    },
    loginIcon: {
        paddingLeft: '7%',
        marginBottom: '5%',
        marginTop: '5%'

    },
    textLogin: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fff',
        alignSelf: 'center',
        paddingLeft: '5%',
        marginBottom: '3%',
    },
    locationCard: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#680d64',
        borderColor: 'transparent'
    },
    locationIcon: {
        paddingLeft: '7%',
        marginTop: '6%'
    },
    locationText: {
        fontSize: 15,
        fontWeight: '400',
        color: 'grey',
        alignSelf: 'center',
        marginTop: '2%',
        paddingLeft: '5%'
    },
    textRow1: {
        color: 'grey',
        marginRight: '5%',
        marginTop: '3%',
        paddingBottom: '3%',
        fontWeight: 'bold'
    },
    textRow2: {
        color: 'grey',
        marginRight: '5%',
        marginTop: '3%',
        paddingBottom: '3%',
        fontWeight: 'bold'
    },
    firstCardImg: {
        borderRadius: 25,
        marginLeft: '5%',
        width: 50,
        height: 50
    },
    Mao: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '15%',
        // paddingTop:'2%'
    },
    maoIcon: {
        // paddingBottom:'40%',
        // marginTop:'2%'
    },
    Designer: {
        color: 'grey',
        marginLeft: '15%',
        marginBottom: '25%',
    },
    badge: {
        // marginTop:'5%'
    },
    textareaContainer1: {
        height: 40,
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
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
        borderRadius: 5,
    },
    mapContainer: {
        width: width - 20,
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
    submitButtonText: {
        color: 'black'
    },
    friendsView: {
        marginTop: '1%',
        paddingBottom: '5%'
    },
    friends: {
        borderRadius: 100,
        alignSelf: 'center',
        // marginTop:'4%',
    },
});

export default Home;

