import React from 'react';

import {StyleSheet, View, Text, Image} from 'react-native';

const CountryInfo = props => {
  const {countries, showConversion} = props;
  return (
    <View style={styles.countryInfo}>
      <CountryItem country={countries} showConversion={showConversion} />
    </View>
  );
};

const CountryItem = props => {
  const {country, showConversion, index} = props;
  return (
    <View key={index} style={styles.container}>
    <View style={styles.sectionContainer}>
      <Text style={styles.countryName}>{country.name}</Text>
      <Image source={{uri: country.flag}} style={{height: 30, width: 50}} />
    </View>
    <View>
      <Text>Population: {country.population}</Text>
      <Text>Capital: {country.capital}</Text>
    </View>
    {country.currencies.length > 0
      ? country.currencies.map(currency => {
          return (
            <View style={styles.currencyDetails}>
              <Text style={styles.currencyDetailsTitle}>
                Currency Details:
              </Text>
              <View style={[styles.itemDetails,{ justifyContent: 'space-around'}]}>
                <Text key={currency.code}>
                  Currency Code: {currency.code}{' '}
                </Text>
                <Text key={currency.name}>
                  Currency Name: {currency.name}{' '}
                </Text>
              </View>
              <View style={[styles.itemDetails,{ justifyContent: 'space-around'}]}>
                <Text key={currency.symbol}>
                  Currency Symbol: {currency.symbol}{' '}
                </Text>
                {showConversion ? (
                  <Text style={styles.conversion}>
                    Converted currency: {currency.converted_amount}
                  </Text>
                ) : null}
              </View>
            </View>
          );
        })
      : null}
  </View>
  );
};
const styles = StyleSheet.create({
countryInfo:{justifyContent:'center', alignItems:'center', },
container: {padding:10,borderWidth:1, borderRadius:5, borderColor:'gray',width:"80%"},
sectionContainer: {flexDirection: 'row', justifyContent: 'space-around', marginVertical:5, alignItems:'center'},
currencyDetails: {justifyContent: 'space-around', marginTop: 10, alignItems:'center'},
itemDetails: {},
countryName: {textAlign: 'center'},
currencyDetailsTitle: {textAlign: 'center'},
conversion: {backgroundColor: 'yellow'}
});

export default CountryInfo;
