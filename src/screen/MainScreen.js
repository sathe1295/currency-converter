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
  Image
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import InputBox from '../components/InputBox';
import CountryInfo from '../components/CountryInfo';
import {SEARCH_ICON, CONVERT_ICON, CURRENCY_ICON} from '../assets/index'
import { searchCountryByFullName } from '../api/currencies';

const MainScreen = () => {
  const [country, setCountry] = React.useState();
  const [showConversion, setShowConversion] = React.useState(false);
  //const API_KEY = "61b0b5431d64185d5550538d4c0b6f30" fixer.io

  const backgroundStyle = {
    flex: 1,
    backgroundColor: "light-gray",
  };

  const onSearch = async searchKey => {
    let country = await searchCountryByFullName(searchKey)
    setCountry(country)
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
      <View style={styles.currencyIconContainer}>
      <Image source={CURRENCY_ICON} resizeMode={"contain"} style={styles.currencyIcon}/>
      </View>
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
const styles = StyleSheet.create({
  currencyIconContainer: {alignItems:'center', marginTop:30},
  currencyIcon: {height:200, width:150}
})

export default MainScreen;
