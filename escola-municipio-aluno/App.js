import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navegacao/Routes';
import { TokenProvider } from './src/token';


export default function App() {

  return (
    <TokenProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#3086ff" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </TokenProvider>
  );
}


  
