import React from "react";
import { StyleSheet } from "react-native";

import MapView, { Marker, Region } from "react-native-maps";

const region: Region = {
  latitude: 37.955414,
  latitudeDelta: 0.02,
  longitude: -91.772255,
  longitudeDelta: 0.02
};
const markers: any[] = [
  {
    description: "705 W 10th St, Rolla, MO 65409",
    latlng: { latitude: 37.951124, longitude: -91.778133 },
    title: "MST Gym"
  }
];

const Map = () => {
  return (
    <MapView style={styles.map} initialRegion={region}>
      {markers.map((marker, index) => (
        <Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          key={index}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    height: 300,
    width: 300
  }
});

export { Map };
