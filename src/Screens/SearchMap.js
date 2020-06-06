import React from 'react';
import {StyleSheet,View,Text,Dimensions,
  TouchableOpacity,Alert,TextInput, ToastAndroid, Button,ScrollView,
  ActivityIndicator} from 'react-native';
import MapView, {Marker,Callout,CalloutSubview,ProviderPropType,} from 'react-native-maps';
import LocationItem from './LocationItem';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//const SPACE = 0.01;
const Toast = (props) => {
  if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(props.message, ToastAndroid.LONG, ToastAndroid.TOP, 25, 150,);
      return null;
  }
  return null;
};
let id = 0;
class SearchMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cnt: 0,
      events: [],
      error:null,
      /*markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE - SPACE / 2,
          },
        },
      ],*/
      markerCoordinate: {latitude:null, longitude:null},
      isMapReady: false,
      textInp: '',
      toasterVisible: false,
      toasterMsg: '',
    };
    this.recordEvent=this.recordEvent.bind(this);
    this.onChangeMarker=this.onChangeMarker.bind(this);
    this.navigate = this.navigate.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
  }

  componentWillMount(){
    
  }

  show() {
    this.marker1.showCallout();
  }

  hide() {
    this.marker1.hideCallout();
  }
  makeEvent(e, name) {
    return {
      id: id++,
      name,
      data: e.nativeEvent ? e.nativeEvent : e,
    };
  }

  recordEvent(name) {
    return e => {
      if (e.persist) {
        e.persist(); 
      }
      this.setState(prevState => ({
        events: [this.makeEvent(e, name), ...prevState.events.slice(0, 10)],
      }));
    };
  }
  onChangeMarker(e) {
    this.setState({markerCoordinate: {latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}});
  }
  navigate(){
    //this.props.navigateTo('AddIncident', {data: this.state.markerCoordinate});
	this.props.enableModal('AddIncident', {data: this.state.markerCoordinate});
  }
  navigateToDetails(details){
    this.props.navigateTo('IncidentDetailsScreen', details);
  }
  updateMarker(selectedLatitude, selectedLongitude){
    this.setState({
      isMapReady:true,
      markerCoordinate: {latitude: selectedLatitude,longitude:selectedLongitude }
  })
  }
  geoSuccess = (position) => {
    this.setState({
        isMapReady:true,
        markerCoordinate: {latitude: position.coords.latitude,longitude:position.coords.longitude }
    })
  }
  geoFailure = (err) => {
    this.setState({
      isMapReady:true,
      markerCoordinate: {latitude:22.5726,longitude:88.3639 }
  })
  }
  onMapLayout = () => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
  };
  this.setState({isMapReady:false});
  navigator.geolocation.getCurrentPosition( this.geoSuccess, 
                                          this.geoFailure,
                                          geoOptions);
  }
  render() {
    
    
    return (
      <View style={styles.container}>
        {this.state.toasterVisible ?
            <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg}/>: null 
        }
        <GoogleAutoComplete apiKey="" debounce={500} minLength={4}>
        {({
          handleTextChange,
          locationResults,
          fetchDetails,
          isSearching,
          inputValue,
          clearSearch
          }) => (
            <React.Fragment>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.textInput} placeholder="Search a places" onChangeText={handleTextChange} value={inputValue}/>
                <Button title="Clear" onPress={clearSearch} />
              </View>
              {isSearching && <ActivityIndicator size="large" color="red" />}
              {!isSearching && console.log(locationResults)}
              <ScrollView>
              {locationResults.map(el => (
                <LocationItem
                  {...el}
                  key={el.id}
                  fetchDetails={fetchDetails}
                  clearSearch={clearSearch}
                  updateMarker={this.updateMarker}
                />
              ))}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <MapView  style={styles.map}
          provider='google'
          zoomEnabled={true}
          region={{latitude:this.state.markerCoordinate.latitude,
                  longitude:this.state.markerCoordinate.longitude,
                  longitudeDelta:0.1,
                  latitudeDelta:0.1}}
          zoomTapEnabled={false}
          onPress={this.onChangeMarker}
          onLayout={() => this.onMapLayout()}
        >
           {this.state.isMapReady ==true ? 
            <MapView.Marker coordinate={this.state.markerCoordinate} >
              <Callout onPress={this.navigate} style={styles.plainView}>
                <View >
                  <Text>Tap to Add an Incident</Text>
                </View>
              </Callout>
            </MapView.Marker>
          : null}
          {this.props.tickerArray.length > 0 ? (
            this.props.tickerArray.map((o, i) => (
              <Marker key={i}
                ref={ref => {
                  this.marker1 = ref;
                }}
                coordinate={o.coordinate}
                title={o.title}
                description={o.description}
              >
                <Callout onPress={() => this.navigateToDetails(o)} style={styles.plainView}>
                  <View >
                    <Text>{o.title}</Text>
                  </View>
              </Callout>
            </Marker>
            ))
          ) : null}
         
        </MapView>  
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.show()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.hide()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Hide</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

SearchMap.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: width * 0.5,
    alignItems: 'center'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: height * 0.17,
    marginBottom: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    zIndex:1,
    padding: 10,
  },
  textInput: {
    height: 40,
    width: width * 0.75,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: 'black',
    color: 'black',
    backgroundColor: '#fff',
    opacity: 0.7,
    marginLeft: 10,
    borderRadius: 5
  },
});

export default SearchMap;