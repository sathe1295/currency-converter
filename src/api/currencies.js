import {isEmpty} from 'lodash';
import {BASE_CURRENCY_FOR_CONVERSION} from '../constants/Constants';

export const searchCountryByFullName = async searchKey => {
  let countryObj = {};
  const fetchCountriesUrl = `https://restcountries.com/v2/name/${searchKey}?fullText=true`;
  try {
    let res = await fetch(fetchCountriesUrl);
    if (res.status === 200) {
      let json = await res.json();
      if (!isEmpty(json) && json.length > 0) {
        json.map(data => {
          countryObj['name'] = data.name;
          countryObj['population'] = data.population;
          countryObj['currencies'] = data.currencies;
          countryObj['capital'] = data.capital;
          countryObj['flag'] = data.flags.png;
        });
      }
    } else {
      alert('Something went wrong');
    }
    if (!isEmpty(countryObj)) {
      return countryObj;
    } else {
      alert('Something went wrong');
    }
  } catch (e) {
    alert(e);
  }
};

export const convertAmount = async (amt, code) => {
  let convertedAmount = 0;
  const conversionUrl = `https://api.frankfurter.app/latest?amount=${amt}&from=${BASE_CURRENCY_FOR_CONVERSION}&to=${code}`;
  if (code === BASE_CURRENCY_FOR_CONVERSION) {
    convertedAmount = amt;
    return convertedAmount;
  } else {
    try {
      let response = await fetch(conversionUrl);
      if (response.status === 200) {
        let data = await response.json();
        convertedAmount = data.rates[code];
      } else {
        alert('Something went wrong');
      }
      if (convertedAmount > 0) {
        return convertedAmount.toFixed(2);
      } else {
        alert('Something went wrong');
      }
    } catch (e) {
      alert(e);
    }
  }
};
