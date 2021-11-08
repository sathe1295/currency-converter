import {isEmpty} from 'lodash';
import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import InputBox from '../components/InputBox';
import CountryInfo from '../components/CountryInfo';
import {SEARCH_ICON, CONVERT_ICON} from '../assets/index'

const MainScreen = () => {
  const [country, setCountry] = React.useState();
  const [showConversion, setShowConversion] = React.useState(false);
  //const API_KEY = "61b0b5431d64185d5550538d4c0b6f30" fixer.io

  const backgroundStyle = {
    flex: 1,
    backgroundColor: "light-gray",
    justifyContent:'center'
  };

  const onSearch = searchKey => {
    fetch(`https://restcountries.com/v2/name/${searchKey}?fullText=true`)
      .then(response => {
        if (response.ok) {
        return response.json();
      } else {
        alert('Something went wrong');
      }})
      .then(json => {
        if (!isEmpty(json) && json.length>0) {
          console.log("json", json)
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
            setCountry(countryObj);
          });
        }
        setShowConversion(false)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onConvert = amt => {
    // fetch(`https://data.fixer.io/api/convert
    // ? access_key = ${API_KEY}
    // & from = SEK
    // & to = ${to}
    // & amount = ${amt}`)
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log('convert', json);
    //    // setCountry(countriesArray);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
        country.currencies.map(currency => {
          fetch(
            `https://api.frankfurter.app/latest?amount=${amt}&from=SEK&to=${currency.code}`,
          )
            .then(response => response.json())
            .then(json => {

          console.log('code', currency.code);
              currency['converted_amount'] = json.rates[currency.code];
              setShowConversion(true);
              console.log('currency conversion', currency.converted_amount);
            })
            .catch(err => {
              console.error(err);
            });
        });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar/>
      <InputBox
        onButtonPress={onSearch}
        placeholder={'Enter country name'}
        icon={SEARCH_ICON}
      />
      <InputBox
        onButtonPress={onConvert}
        placeholder={'Enter amount in SEK'}
        icon={CONVERT_ICON}
      />
      {!isEmpty(country) ? (
        <CountryInfo countries={country} showConversion={showConversion} />
      ) : null}
    </SafeAreaView>
  );
};

export default MainScreen;
