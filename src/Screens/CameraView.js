import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default class CameraView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasPermission: '',
            type: Camera.Constants.Type.back
        }
        this.setHasPermission = this.setHasPermission.bind(this);
        this.setType = this.setType.bind(this);
    }
    componentDidMount(){
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
      };
    
    setHasPermission(perm){
        this.setState({hasPermission: perm});
    }
    setType(){
        const types = this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back;
        this.setState({type: types});
    }
    render() {
        if (this.state.hasPermission === null) {
            return <View />;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.type}>
                    <View style={{flex: 1,backgroundColor: 'transparent',flexDirection: 'row',}}>
                        <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center', }}
                            onPress={this.setType}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
}