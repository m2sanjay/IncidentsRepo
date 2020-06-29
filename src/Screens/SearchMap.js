import React from 'react';
import {
  StyleSheet, View, Text, Dimensions,
  TouchableOpacity, Alert, TextInput, ToastAndroid, ScrollView,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, Heatmap, Callout, CalloutSubview, ProviderPropType, Circle } from 'react-native-maps';
import LocationItem from './LocationItem';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Geocoder from 'react-native-geocoding';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import { Button } from 'react-native-elements';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import markerImage from './../Images/marker100.png';

import _ from 'lodash';
import { Block } from 'galio-framework';

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
      error: null,
      // heatDataAlabama: [
      //   { latitude: 34.774548, longitude: -90.757260, weight:5 },
      //   { latitude: 34.774353, longitude: -90.756905, weight:6 },
      //   { latitude: 33.939323, longitude: -91.845140, weight:6 },
      //   { latitude: 33.957665, longitude: -91.727624, weight:8 },
      //   { latitude: 33.672880, longitude: -94.132710, weight:8 },
      //   { latitude: 33.699497, longitude: -94.229774, weight:8 },
      //   { latitude: 35.288918, longitude: -93.734955, weight:4 }
      // ],
      heatDataAlabama:[],
      markerCoordinate: { latitude: null, longitude: null },
      selectedAddress: {},
      isMapReady: false,
      textInp: '',
      toasterVisible: false,
      toasterMsg: '',
      error: null,
      isLoaded: false,
      items: [],
      tableHead: ['Offence Type', 'Count'],
      widthArr: [150, 60],
    };
    this.recordEvent = this.recordEvent.bind(this);
    this.onChangeMarker = this.onChangeMarker.bind(this);
    this.navigate = this.navigate.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
  }

  componentDidMount() {
    Geocoder.init("");

    fetch('http://192.168.1.14:8080/getIncidents')
      .then(response => response.json())
      .then(items => {
        this.setState({ items })
    })

    fetch('http://192.168.1.14:8080/getIncidentsHeatMap')
      .then(response => response.json())
      .then(heatDataAlabama => {
        this.setState({ heatDataAlabama })
    })
    
    
      
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
      console.log("onChangeMarker");
      this.props.updateTicker(e.nativeEvent.coordinate.latitude, 
        e.nativeEvent.coordinate.longitude );
    
      this.setState({ markerCoordinate: { 
        latitude: e.nativeEvent.coordinate.latitude, 
        longitude: e.nativeEvent.coordinate.longitude 
      } 
    });

    Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
      .then(json => {
         //console.log(json);
         var addressComponent = json.results[0].address_components;
         //console.log(addressComponent);
         this.setState({ selectedAddress : addressComponent});
         //console.log("getting data from state");
         //console.log(this.state.selectedAddress);     
      })
      .catch(error => console.warn(error));
    
    // console.log("Getting Address Data");
    // Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
    //   .then(json => {
    //     console.log(json);
    //     var addressComponent = json.results[0];//.address_components[0];
    //     console.log(addressComponent.formatted_address);
    //   })
    //   .catch(error => console.warn(error));
    //console.log(this.state.selectedAddress);
  }
  navigate() {
    //this.props.navigateTo('AddIncident', {data: this.state.markerCoordinate});
    this.props.enableModal('AddIncident', { 
      data: this.state.markerCoordinate, 
      selectedAddress: this.state.selectedAddress,
      updateExisting: false,
      existingIncidents: null
    });
  }

  updateIncidentToExistingLocation(obj) {
    this.props.enableModal('AddIncident', { 
      data: null, 
      selectedAddress: null, 
      updateExisting: true,
      existingIncidents: obj
    });
  }

  navigateToDetails(details) {
    this.props.navigateTo('IncidentDetailsScreen', details);
  }
  updateMarker(selectedLatitude, selectedLongitude) {
    this.setState({
      isMapReady: true,
      markerCoordinate: { latitude: selectedLatitude, longitude: selectedLongitude }
    })
  }
  geoSuccess = (position) => {
    this.setState({
      isMapReady: true,
      markerCoordinate: { latitude: position.coords.latitude, longitude: position.coords.longitude }
    })
  }
  geoFailure = (err) => {
    this.setState({
      isMapReady: true,
      markerCoordinate: { latitude: 22.5726, longitude: 88.3639 }
    })
  }
  onMapLayout = () => {
    console.log("onMapLayout");
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ isMapReady: false });
    navigator.geolocation.getCurrentPosition(this.geoSuccess,
      this.geoFailure,
      geoOptions);

      
  }
  render() {
    //console.log(this.state.items);
    // const crimeData = this.state.items.forEach((o) => {
    //     o.latitude, o.longitude, o.offenceName, o.count
    // });
    // console.log(crimeData);

    //var that = this;
    // let tableData = [];
    // this.state.items.forEach(item => {
    //   tableData.push([item.offenceName, item.count]);
    // });
    // console.log(tableData);

    let tableData = this.state.items.map(record => ([record.latitude, record.longitude, 
      record.offenceName, record.count]));
    
    const tableDataFull = this.state.items;
    
    //console.log(tableData);
    //console.log(this.state.heatDataAlabama);
    return (
      <View style={styles.container}>
        {this.state.toasterVisible ?
          <Toast visible={this.state.toasterVisible} message={this.state.toasterMsg} /> : null
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
                  <TextInput style={styles.textInput} placeholder="Search a places" onChangeText={handleTextChange} value={inputValue} />
                  {/* <Button title="Clear" onPress={clearSearch} /> */}
                  <Button
                    icon={{ name: "cancel", zIndex:2, size: 30, marginTop: -5, color: "#0A121A" }}
                    type="clear"
                    onPress={clearSearch} />
                </View>
                {isSearching && <ActivityIndicator size="large" color="red" />}
                <ScrollView style={{ zIndex: 2 }}>
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
        
        <MapView style={styles.map}
          provider='google'
          zoomEnabled={true}
          region={ this.state.markerCoordinate.latitude != null ?
            {
            latitude: this.state.markerCoordinate.latitude,
            longitude: this.state.markerCoordinate.longitude,
            longitudeDelta: 0.1,
            latitudeDelta: 0.1
          } : null
        }
          zoomTapEnabled={false}
          onPress={this.onChangeMarker.bind(this)}
          onLayout={() => this.onMapLayout()}
        >
          
          {/* {this.state.isMapReady ==true ? 
              <Circle center ={this.state.markerCoordinate} radius={5000}/>:null} */}
          
          {this.state.heatDataAlabama.length >0 ?
          <Heatmap
            points = {this.state.heatDataAlabama}
            // gradient = {{
            //    colors: ["#79BC6A", "#BBCF4C", "EEC20B", "#F29305", "E50000"],
            //    startPoints: [0, 0.25, 0.50, 0.75, 1],
            //    colorMapSize: 500
            // }}
          ></Heatmap> : null }
          {this.state.isMapReady == true ?
            <MapView.Marker coordinate={this.state.markerCoordinate}
              image={markerImage}>
              <Callout onPress={this.navigate} style={styles.plainViewNew}>
                <View>
                  <Text style={{color: 'black'}}>Add an incident</Text>
                </View>
              </Callout>
            </MapView.Marker>
            : null}
          {this.state.items.length > 0 ? (
            this.state.items.map((o, i) => (
              <Marker key={i}
                ref={ref => {
                  this.marker1 = ref;
                }}
                coordinate={{
                  latitude: o.latitude,
                  longitude: o.longitude
                }}
                title={o.offenceName}
                description={o.offenceName}
              >
                <Callout //onPress={() => this.navigateToDetails(o)} 
                    onPress={() => this.updateIncidentToExistingLocation(o)}
                    style={styles.plainView}>
                  {/* <View >
                        <Text>{o.title}</Text>
                      </View> */}
                  <View style={styles1.container}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                          <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles1.header} textStyle={styles1.text} />
                        </Table>
                        <ScrollView style={styles1.dataWrapper}>
                          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                              _.filter(tableDataFull, incident => incident.latitude === o.latitude && incident.longitude === o.longitude)
                              .map((rowData, index) => (
                                <Row
                                  key={index}
                                  // data={o.latitude == rowData["latitude"] && o.longitude == rowData["longitude"] ?
                                  //   new Array(rowData["offenceName"] , rowData["count"]) : null }
                                  data={new Array(rowData.offenceName, rowData.count)}
                                  widthArr={this.state.widthArr}
                                  style={[styles1.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                  textStyle={styles1.text}
                                />
                              ))
                            }
                          </Table>
                        </ScrollView>
                        <Block center row style={{margiflexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button
                              containerStyle={styles.createButton3}
                              type="solid"
                              onPress={this.updateIncidentToExistingLocation} 
                              titleStyle={{color:'black', fontSize: 12 }} 
                              title='Add new incident'/> 
                          </Block>
                      </View>
                    </ScrollView>
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

const styles1 = StyleSheet.create({
  container: { flex: 1, padding: 2, paddingTop: 2, backgroundColor: '#fff' },
  header: { height: 30, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 20, backgroundColor: '#E7E6E1' }
});

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: width * 0.5,
    alignItems: 'center',
  },
  plainViewNew: {
    width: width * 0.25,
    alignItems: 'center',
  },
  createButton3: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignSelf: 'flex-end'
    
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
    zIndex: 1,
    padding: 10,
    paddingBottom: 0
  },
  textInput: {
    height: 40,
    width: width * 0.80,
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