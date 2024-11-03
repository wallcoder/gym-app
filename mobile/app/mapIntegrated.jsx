import { SafeAreaView, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapIntegrated = () => {
  const [mapType, setMapType] = useState('standard'); 
  const mapRef = useRef(null); 

  const initialRegion = {
    latitude: 23.740556,
    longitude: 92.650944,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'satellite' : 'standard'));
  };

  const handleLocationSelect = (data, details) => {
    console.log('Selected Place Data:', data);
    console.log('Selected Place Details:', details);
    
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      console.log('No details found for the selected location');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden={true} />
      <View className="flex-1">
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={handleLocationSelect}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY, 
            language: 'en',
          }}
          styles={{
            container: { position: 'absolute', top: 10, left: 10, right: 10, zIndex: 1 },
            textInput: { height: 44, color: '#5d5d5d', fontSize: 16 },
          }}
        />
        
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          showsUserLocation={true}
          loadingEnabled={true}
          mapType={mapType}
        >
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title={"Mizoram University"}
            pinColor={"#52AB99"}
          >
            <Callout>
              <View className="w-48 p-2 bg-white rounded-lg shadow-md">
                <Text className="font-bold text-black">Mizoram University</Text>
                <Text className="text-gray-600">
                  Gym is available but too far from the hostel.
                </Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        
        <View className="absolute bottom-5 left-5 right-5">
          <TouchableOpacity 
            onPress={toggleMapType} 
            className="bg-[#52AB99] p-3 rounded-md"
          >
            <Text className="text-white text-center">
              Switch to {mapType === 'standard' ? 'Satellite' : 'Standard'} View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapIntegrated;
