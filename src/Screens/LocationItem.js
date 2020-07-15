import React, { PureComponent } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class LocationItem extends PureComponent {
  _handlePress = async () => {
    //console.log('Id', this.props.id);
    //console.log('PlaceId', this.props.place_id);
    const res = await this.props.fetchDetails(this.props.place_id);
    //console.log('result', res);
    //console.log('Gepmetry Details', res.geometry.location.lat);
    this.props.updateMarker( res.geometry.location.lat, res.geometry.location.lng);
    this.props.clearSearch();
  }

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text style={{  color: 'black'}}>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    //width: width * 0.80,
    backgroundColor: 'white'
  }
})

