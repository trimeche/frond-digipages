import React from 'react';
import {StatusBar} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Provider as PaperProvider} from 'react-native-paper';
import LoadIconFonts from './src/Components/Common/LoadIconFonts';
import MainNavigator from './src/Navigations/MainNavigator';
import {URL} from './src/Constants/Config';

const client = new ApolloClient({
  uri: `${URL}/graphql`,
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <React.Fragment>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <LoadIconFonts />
          <MainNavigator />
        </React.Fragment>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
