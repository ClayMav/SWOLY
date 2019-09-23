import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import Auth0 from "react-native-auth0";

var credentials = require("./auth0-credentials");
const auth0 = new Auth0(credentials);
const region = {
  latitude: 37.955414,
  longitude: -91.772255,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

const markers = [
  {
    latlng: { latitude: 37.951124, longitude: -91.778133 },
    title: "MST Gym",
    description: "705 W 10th St, Rolla, MO 65409"
  }
];

export default class SWOLY extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  _onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: "openid profile",
        audience: "https://" + credentials.domain + "/userinfo"
      })
      .then(credentials => {
        Alert.alert(
          "Success",
          "AccessToken: " + credentials.accessToken,
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed")
            }
          ],
          { cancelable: false }
        );
        this.setState({ accessToken: credentials.accessToken });
      })
      .catch(error => console.log(error));
  };

  _onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert("Logged out!");
        this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log("Log out cancelled");
      });
  };

  render() {
    let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>SWOLY</Text>
        <Text>You are {loggedIn ? "" : "not "} logged in . </Text>
        <Button
          onPress={loggedIn ? this._onLogout : this._onLogin}
          title={loggedIn ? "Log Out" : "Log In"}
        />
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={region}
        >
          {markers.map((marker, index) => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              key={index}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

/*
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    height: 300,
    width: 300
  }
});

AppRegistry.registerComponent("SWOLY", () => SWOLY);
