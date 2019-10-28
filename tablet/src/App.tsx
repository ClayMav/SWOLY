import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient(
  {
    uri: 
  }
);

const App: React.FC = () => (
  <ApolloProvider client = {client}>
    
  </ApolloProvider> 
)

export default App;
