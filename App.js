/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchInput from "./components/SearchInput"

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex:1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onSearch = (searchKey) => {
    fetch(`https://restcountries.com/v2/name/${searchKey}`)
    .then((response) => response.json())
    .then((json) => {
      console.log("json",json)
      //return json.movies;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchInput onSearch={onSearch}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
