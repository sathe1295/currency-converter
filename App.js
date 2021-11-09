import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import MainScreen from './src/screen/MainScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar/>
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;
