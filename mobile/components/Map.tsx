import React from "react";
import { StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

const delta: any = {
  latitudeDelta: 0.03,
  longitudeDelta: 0.03
};

const Map = props => {
  const {
    name,
    location: { latitude, longitude }
  } = props.marker;

  return (
    <MapView
      style={props.style}
      initialRegion={{ latitude, longitude, ...delta }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title={name}
        description={"Nope"}
      />
    </MapView>
  );
};

export { Map };
