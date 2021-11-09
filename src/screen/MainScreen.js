import {isEmpty} from 'lodash';

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Image} from 'react-native';

import InputBox from '../components/InputBox';
import CountryInfo from '../components/CountryInfo';

import {SEARCH_ICON, CONVERT_ICON, CURRENCY_ICON} from '../assets/index';
import {convertAmount, searchCountryByFullName} from '../api/currencies';

const MainScreen = () => {
  const [country, setCountry] = React.useState();
  const [showConversion, setShowConversion] = React.useState(false);

  const onSearch = async searchKey => {
    let country = await searchCountryByFullName(searchKey);
    setCountry(country);
    setShowConversion(false);
  };

  const onConvert = async amt => {
    setShowConversion(false);
    country.currencies.map(async currency => {
      let conversion = await convertAmount(amt, currency.code);
      currency['converted_amount'] = conversion;
      conversion>0 ? setShowConversion(true) : null;
    });
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar />
      <View style={styles.currencyIconContainer}>
        <Image
          source={CURRENCY_ICON}
          resizeMode={'contain'}
          style={styles.currencyIcon}
        />
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
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'light-gray',
  },
  currencyIconContainer: {alignItems: 'center', marginTop: 30},
  currencyIcon: {height: 200, width: 150},
});

export default MainScreen;
