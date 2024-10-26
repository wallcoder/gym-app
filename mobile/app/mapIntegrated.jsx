import { SafeAreaView, View, StatusBar, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapIntegrated = () => {
  const [mapType, setMapType] = useState('standard'); 

  const initialRegion = {
    latitude: 23.740556, 
    longitude: 92.650944,  
    latitudeDelta: 0.0922,  
    longitudeDelta: 0.0421,  
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'satellite' : 'standard'));
  };

  return (
    <SafeAreaView className="flex-1 pt-6">
      
      <StatusBar hidden={true} />
      <View className="flex-1">
        <MapView
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
                  Gym is available but too far from the hostel. 
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
