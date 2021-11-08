
import {isEmpty} from 'lodash';

export const searchCountryByFullName = async (searchKey) => {
   await  fetch(`https://restcountries.com/v2/name/${searchKey}?fullText=true`)
      .then(response => response.json())
      .then(json => {
        let countriesArray = [];
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
            countriesArray.push(countryObj);
          });

          console.log("hem", countriesArray)
        return countriesArray
        }
        console.log('countries', json);
      })
      .catch(error => {
        console.error(error);
      });
}


export const convertAmount = (amt, code) => {
    fetch(
        `https://api.frankfurter.app/latest?amount=${amt}&from=SEK&to=${code}`,
      )
        .then(response => response.json())
        .then(json => {
            let convertedAmount
            convertedAmount = json.rates[code];
          console.log('currency conversion', convertedAmount);
          return convertedAmount
        })
        .catch(err => {
          console.error(err);
        });
}