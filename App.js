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
  View,TextInput,TouchableOpacity,Text
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import InputBox from './components/InputBox';
import CountryInfo from './components/CountryInfo';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [country, setCountry] = React.useState([]);
  const [convertedAmount, setConvertedAmount] = React.useState(-1)

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

  const onConvert = searchKey => {
    // fetch(`https://restcountries.com/v2/name/${searchKey}`)
    //   .then(response => response.json())
    //   .then(json => {
    //     let countriesArray = [];
    //     if (!isEmpty(json)) {
    //       json.map(data => {
    //         let countryObj = {
    //           name: '',
    //           population: 0,
    //           currencies: [],
    //           capital: '',
    //           flag: '',
    //         };
    //         countryObj['name'] = data.name;
    //         countryObj['population'] = data.population;
    //         countryObj['currencies'] = data.currencies;
    //         countryObj['capital'] = data.capital;
    //         countryObj['flag'] = data.flags.png;
    //         countriesArray.push(countryObj);
    //       });
    //     }
    //     console.log('countries', json);
    //     setCountry(countriesArray);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    setConvertedAmount(1)
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <InputBox onButtonPress={onSearch} placeholder={"Enter country name"} buttonLabel={"Search"} />
      <InputBox onButtonPress={onConvert}  placeholder={"Enter amount in SEK"} buttonLabel={"Convert"}/>
      {!isEmpty(country) ? <CountryInfo countries={country} convertedAmount={convertedAmount}/> : null}
    </SafeAreaView>
  );
};

export default App;
