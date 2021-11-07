import React from 'react';
import Seperator from './Seperator';

import {StyleSheet, View, Text, Image, FlatList} from 'react-native';

const CountryInfo = props => {
  const {countries} = props;
  return (
    <View style={{flex:1,justifyContent: 'center'}}>
      <FlatList
        data={countries}
        ItemSeparatorComponent = {()=><Seperator/> }
        renderItem={({item, index}) => {
          return <CountryItem index={index} country={item} />;
        }}
      />
    </View>
  );
};

const CountryItem = props => {
  const {country, index} = props;
  return (
    <View key={index} style={{padding:10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{textAlign: 'left'}}>{country.name}</Text>
        <Image source={{uri: country.flag}} style={{height: 20, width: 50}} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text>Population: {country.population}</Text>
        <Text>Capital: {country.capital}</Text>
      </View>
      {country.currencies.length > 0
        ? country.currencies.map(currency => {
            return (
              <View
                key={'currency_view0'}
                style={{justifyContent: 'space-around'}}>
                <Text style={{textAlign: 'center'}}>Currency Details:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text key={currency.code}>
                    Currency Code: {currency.code}{' '}
                  </Text>
                  <Text key={currency.name}>
                    Currency Name: {currency.name}{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text key={currency.symbol}>
                    Currency Symbol: {currency.symbol}{' '}
                  </Text>
                </View>
              </View>
            );
          })
        : null}
    </View>
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

export default CountryInfo;
