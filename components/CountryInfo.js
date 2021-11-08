import React from 'react';
import Seperator from './Seperator';

import {StyleSheet, View, Text, Image, FlatList} from 'react-native';

const CountryInfo = props => {
  const {countries, showConversion} = props;
  return (
    <View style={styles.countryInfo}>
      <FlatList
        data={countries}
        ItemSeparatorComponent={() => <Seperator />}
        renderItem={({item, index}) => {
          return (
            <CountryItem
              key={index}
              country={item}
              showConversion={showConversion}
            />
          );
        }}
      />
    </View>
  );
};

const CountryItem = props => {
  const {country,showConversion} = props;
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.countryName}>{country.name}</Text>
        <Image source={{uri: country.flag}} style={{height: 20, width: 50}} />
      </View>
      <View style={styles.sectionContainer}>
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
                <View style={styles.itemDetails}>
                  <Text key={currency.code}>
                    Currency Code: {currency.code}{' '}
                  </Text>
                  <Text key={currency.name}>
                    Currency Name: {currency.name}{' '}
                  </Text>
                </View>
                <View style={styles.itemDetails}>
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
    countryInfo:{flex: 1, justifyContent: 'center'},
  container: {padding: 10},
  sectionContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  currencyDetails: {justifyContent: 'space-around', marginTop: 20},
  itemDetails: {flexDirection: 'row', justifyContent: 'space-around'},
  countryName: {textAlign: 'left'},
  currencyDetailsTitle: {textAlign: 'center'},
  conversion: {backgroundColor: 'yellow'}
});

export default CountryInfo;
