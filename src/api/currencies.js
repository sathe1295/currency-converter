
import {isEmpty} from 'lodash';

export const searchCountryByFullName = async (searchKey) => {
    let countryObj={}
  let res = await  fetch(`https://restcountries.com/v2/name/${searchKey}?fullText=true`)
      if(res.status===200){
          console.log("rs",res)
          let json = await res.json();
          if (!isEmpty(json) && json.length>0) {
                  console.log("json", json)
                  json.map(data => {
                    countryObj['name'] = data.name;
                    countryObj['population'] = data.population;
                    countryObj['currencies'] = data.currencies;
                    countryObj['capital'] = data.capital;
                    countryObj['flag'] = data.flags.png;
                  });
      }
    } else{
        alert("Something went wrong")
    }
    console.log("countryobj", countryObj)
    return countryObj
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