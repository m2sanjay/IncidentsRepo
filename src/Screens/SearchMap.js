import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  ProviderPropType,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
let id = 0;
class SearchMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cnt: 0,
      events: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
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
      ],
      markerCoordinate: null,
    };
    this.recordEvent=this.recordEvent.bind(this);
    this.onChangeMarker=this.onChangeMarker.bind(this);
    this.navigate = this.navigate.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
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
  render() {
    const { region, markers } = this.state;
    
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
          zoomTapEnabled={false}
          onPress={this.onChangeMarker}
        >
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
          {this.state.markerCoordinate != null ? 
            <Marker coordinate={this.state.markerCoordinate} >
              <Callout onPress={this.navigate} style={styles.plainView}>
                <View >
                  <Text>Tap to Add an Incident</Text>
                </View>
              </Callout>
            </Marker>
          : null}
        </MapView>
        <View style={styles.buttonContainer}>
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
        </View>
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
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: height * 0.17,
    marginBottom: 40
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
});

export default SearchMap;