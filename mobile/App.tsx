import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { AppRegistry } from "react-native";

import { createAppContainer } from "react-navigation";

import { PreAuthSwitchNavigator } from "./navigators/PreAuthSwitchNavigator";

const AppContainer = createAppContainer(PreAuthSwitchNavigator);

const client = new ApolloClient({
  uri: "https://us-central1-swoly-252721.cloudfunctions.net/gql-test"
});

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
