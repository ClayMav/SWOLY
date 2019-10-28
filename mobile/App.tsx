import React, { setGlobal } from "reactn";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { createAppContainer } from "react-navigation";

import { PreAuthSwitchNavigator } from "./navigators/PreAuthSwitchNavigator";

const AppContainer = createAppContainer(PreAuthSwitchNavigator);

const client = new ApolloClient({
  uri: "https://us-central1-swoly-252721.cloudfunctions.net/gql-test"
});

setGlobal({
  location: undefined,
  workouts: [],
  gym: undefined,
  user: undefined
});

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
