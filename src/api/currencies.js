import {isEmpty} from 'lodash';

export const searchCountryByFullName = async searchKey => {
  let countryObj = {};
  try {
    let res = await fetch(
      `https://restcountries.com/v2/name/${searchKey}?fullText=true`,
    );
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
  if (code === 'SEK') {
    convertedAmount = amt;
    return convertedAmount;
  } else {
    try {
      let response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amt}&from=SEK&to=${code}`,
      );
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
