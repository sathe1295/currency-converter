/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {isEmpty} from 'lodash';
import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchInput from './components/SearchInput';
import CountryInfo from './components/CountryInfo';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [country, setCountry] = React.useState([]);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onSearch = searchKey => {
    fetch(`https://restcountries.com/v2/name/${searchKey}`)
      .then(response => response.json())
      .then(json => {
        let countriesArray = [];
        if (!isEmpty(json)) {
          json.map(data => {
            let countryObj = {
              name: '',
              population: 0,
              currencies: [],
              capital: '',
              flag: '',
            };
            countryObj['name'] = data.name;
            countryObj['population'] = data.population;
            countryObj['currencies'] = data.currencies;
            countryObj['capital'] = data.capital;
            countryObj['flag'] = data.flags.png;
            countriesArray.push(countryObj);
          });
        }
        console.log('countries', json);
        setCountry(countriesArray);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchInput onSearch={onSearch} />
      {!isEmpty(country) ? <CountryInfo countries={country} /> : null}
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
