import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from "react-native-maps";
import Search from '../search';
import Directions from '../directions';
import { enableLatestRenderer } from 'react-native-maps';
import { getPixelSize } from '../../utils';

// import { Container } from './styles';

export default class Map extends Component{

    state = {
        region: null,
        destination: null,
    };

    async componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({ 
                region: { 
                    latitude,
                    longitude, 
                    latitudeDelta: 1, 
                    longitudeDelta: 1, 
                } 
            })
            }, //sucesso
            () => {}, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
    }

    handleLocationSelectd = (data, {geometry}) => {
        const { location: {lat: latitude, long: longitude } } = geometry;
        this.setState({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
        })
    }

    render(){
        enableLatestRenderer();
        const { region, destination } = this.state;

        return( 
        <View style={{flex: 1}}>
        <MapView 
          style={{flex: 1}}
          region={ region }
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          ref={el => this.map = el}
        >
            {destination && (
                <Directions
                    origin={region}
                    destination={destination}
                    onReady={result => {
                        this.map.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: getPixelSize(50),
                                left: getPixelSize(50),
                                top: getPixelSize(50),
                                bottom: getPixelSize(50),
                            }
                        })
                    }}
                />
            )}
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected} />
      </View>
      );
    }
}
