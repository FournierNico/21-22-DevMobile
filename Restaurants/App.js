import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import Navigation from './src/navigation/Navigation';
import Store from './src/store/config';

export default function App() {
  return (
    <Provider store={Store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}