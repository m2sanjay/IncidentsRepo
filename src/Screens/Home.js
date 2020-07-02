import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ActivityIndicator, ToastAndroid, AsyncStorage } from 'react-native';
import { Text, Block } from 'galio-framework';
import TextTicker from 'react-native-text-ticker';
import SearchMap from "./SearchMap.js";
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';

import AddIncidentPopUp from './AddIncidentPopUp';
import { Cache } from 'react-native-cache';

const { width, height } = Dimensions.get("screen");

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(props.message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 150);
        return null;
    }
    return null;
};

const cache = new Cache({
    namespace: 'InciTracker',
    policy: {
        maxEntries: 5000
    },
    backend: AsyncStorage 
})

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
            liveIncidents: []
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
    }

    updateData(latitude, longitude){
       this.setState({ isLoaded : true });
       console.log("Getting HeatMap Data from DB");
       console.log(latitude, longitude);
        fetch('http://192.168.1.14:8080/getCount?lat=' + latitude + '&lng=' + longitude)
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
        fetch('http://192.168.1.14:8080/getTickerListByLatLngFormatted?lat=' + latitude + '&lng=' + longitude)
        .then(res => res.json())
        .then(
          (tickerArray) => {
            this.setState({
              //isLoaded: false,
              tickerArray: tickerArray,
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
        fetch('http://192.168.1.14:8080/getLiveIncidentsListByLatLngFormatted?lat=' + latitude + '&lng=' + longitude)
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

    updateTicker(latitude, longitude) {
        // fetch('http://192.168.1.14:8080/getIncidentsListByLatLngFormatted?lat=' + latitude + '&lng=' + longitude)
        //     .then(response => response.json())
        //     .then(tickerArray => {
        //         this.setState({ tickerArray })
        //     })
    }

    callbackFn(incident, commentText, imageUrls, videoUrl) {

        //Saving files 
        for(let i=0; i < imageUrls.length ; i++){
            let localUrl = imageUrls[i];
            let fileName =  localUrl.split('/').pop();
            let formData = new FormData();

            console.log(localUrl);
            console.log(fileName);
            console.log(imageUrls.length);

            formData.append('photo' , { uri: localUrl, name: fileName, type: 'image'} );
            return fetch('http://192.168.1.14:8080/addImage?incId='+ incident.incidentId ,{
                method: 'POST',
                body: formData,
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            });
        }

        console.log("Image Req submitted");
        /*
        let node = _.filter(this.state.tickerArray, function (o) {
            if (o.title == title)
                return o;
        });
        let existingComments = node[0].comments;
        let length = existingComments.length + 1;
        existingComments.push({
            id: '' + length, name: 'New User', text: commentText, imageUrls: imageUrl,
            videoUrls: videoUrl
        });

        this.setState({ tickerArray: this.state.tickerArray });
        */

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

    callbackPopUpAPI(postJson, createOrUpdate) {
        fetch('http://192.168.1.14:8080/addIncident/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postJson)
            }
        ).then(res => res.json())
         .then(
           (incidentId) => {
            console.log(incidentId);
        });

        this.setState({
            toasterVisible: true,
            isLoaded: true,
            toasterMsg: "Incident Added Successfully",
        });

        this.updateData(postJson.latitude, postJson.longitude);

    }

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
        return this.state.liveIncidents;
    }

    updateImages(){

    }

    render() {

        let liveIncidents = this.state.liveIncidents;
        console.log("Ticker Data");
        console.log(liveIncidents);

        return (

            <View style={styles.container}>
                {this.state.toasterVisible ?
                    <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg}/>: null 
                }
                <Block style={{ backgroundColor: '#0A121A', width, height, zIndex: 1 }}>
                    <Block style={{ backgroundColor: '#00c5e8' }} middle>
                        <Text style={styles.profileText}>Incident Tracker</Text>
                    </Block>
                    <View style={{ height: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {liveIncidents.length > 0 ?
                                <TextTicker style={{ height: 50, padding: 15, fontSize: 17, backgroundColor: 'black' }}
                                    //duration={10000} bounce={false}
                                    loop={true}
                                    //scrollSpeed={3000}
                                    scrollSpeed={3000}
                                >

                                    {liveIncidents.map((incident, i) => (
                                            <Text style={{ color: 'orange' }} key={i} onPress={() => this.props.navigation.navigate('IncidentDetailsScreen', { data: incident, callback: this.callbackFn })}>
                                                {incident.offenceName + '  |  '}
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
                        updateData={this.updateData.bind(this)} />
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

