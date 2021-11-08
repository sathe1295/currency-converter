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
  console.log("currencie", country)
  return (
    <View key={index} style={styles.container}>
      <View style={styles.sectionContainer}>
        <Image source={{uri: country.flag}} style={styles.flag} />
        <Text style={styles.countryName}>{country.name}</Text>
      </View>
      <View>
        <View style={{marginTop: 10}}>
          <Text style={styles.text}>Population: {country.population}</Text>
          <Text style={styles.text}>Capital: {country.capital}</Text>
        </View>
        {country.currencies && country.currencies.length > 0
          ? country.currencies.map((currency, index) => {
              return (
                <View key={index} style={styles.currencyDetails}>
                  <Text style={styles.currencyDetails}>Currency Details:</Text>
                  <View style={styles.itemDetails}>
                    <Text key={currency.code} style={styles.text}>
                      Currency Code: {currency.code}{' '}
                    </Text>
                    <Text key={currency.name} style={styles.text}>
                      Currency Name: {currency.name}{' '}
                    </Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text key={currency.symbol} style={styles.text}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  countryInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 1,
  },
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: '90%',

    backgroundColor: 'white',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    alignItems: 'center',
  },
  currencyDetails: {
    justifyContent: 'space-around',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
  },
  itemDetails: {marginTop: 5, justifyContent: 'space-around'},
  countryName: {textAlign: 'center', fontWeight: 'bold', fontSize: 16},
  conversion: {backgroundColor: 'yellow', fontWeight: '500'},
  flag: {height: 30, width: 50},
  text: {
    fontWeight: '400',
    marginTop: 2,
  },
});

export default CountryInfo;
