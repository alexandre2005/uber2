import React, { 
    Component, 
    Fragment 
} from 'react';

import { View, Image } from 'react-native';
import MapView, {Marker} from "react-native-maps";
import Search from '../search';
import Directions from '../directions';
import { enableLatestRenderer } from 'react-native-maps';
import { getPixelSize } from '../../utils';
import Details from '../details';

import Geocoder from 'react-native-geocoding';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import { 
    Back,
    LocationBox,
    LocationText, 
    LocationTimeBox, 
    LocationTimeText, 
    LocationTimeTextSmall
} from './styles';

Geocoder.init('AIzaSyDy-pyKdAcWFFWUd10kDSMkDTKbJdlpoDY')

// import { Container } from './styles';

export default class Map extends Component{

    state = {
        region: null,
        destination: null,
        duration: null,
        location: null,
    };

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           async ({ coords: { latitude, longitude } }) => {
            const response = await Geocoder.from({ latitude, longitude });
            const address = response.results[0].formatted_address;
            const location = address.substring(0, address.indexOf(','))

                this.setState({
                    location,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    },
                });
            }, // Success
            (error) => {
                console.error("Error getting current position:", error);
                // Handle the error if needed
            },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        );
    };
    

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
        });
    };
    
    handleBack = () => {
        this.setState({ destination: null });
    };

    render() {
        enableLatestRenderer();
        const { region, destination, duration, location } = this.state;
    
        return (
            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}}
                    region={region}
                    showsUserLocation
                    showsMyLocationButton
                    loadingEnabled
                    ref={el => this.map = el}
                >
                    {destination && (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    this.setState({ duration: Math.floor(result.duration) })

                                        this.map.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: getPixelSize(50),
                                                left: getPixelSize(50),
                                                top: getPixelSize(50),
                                                bottom: getPixelSize(350),
                                            }
                                        });
                                    }
                                }
                            />
                            <Marker
                             coordinate={destination}
                             anchor={{ x: 0, y: 0 }}
                             image={markerImage}
                            >
                                <LocationBox elevation={1}>
                                    <LocationText>
                                        {destination.title}
                                    </LocationText>
                                </LocationBox>
                            </Marker>

                            <Marker
                             coordinate={region}
                             anchor={{ x: 0, y: 0 }}
                             image={markerImage}
                            >
                                <LocationBox elevation={1}>
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>Min</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>
                                        {location}
                                    </LocationText>
                                </LocationBox>
                            </Marker>

                        </Fragment>
                    )}
                </MapView>
                {destination ? (
                    <Fragment>
                        <Back onPress={this.handleBack}>
                            <Image source={backImage}/>
                        </Back>
                        <Details />
                    </Fragment>
                ) : (
                    <Search onLocationSelected={this.handleLocationSelected} />
                )}
                
            </View>
        );
    }
    
}
