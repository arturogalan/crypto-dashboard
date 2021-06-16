import axios from 'axios';
import {getRangeAndInterval} from '../utils/formatUtils';

const urls = {
  assets: ()=> 'https://api.coincap.io/v2/assets',
  history: ({currencyId, interval, start, end})=> `https://api.coincap.io/v2/assets/${currencyId}/history?interval=${interval}&start=${start}&end=${end}`
} 

export function fetchCryptoVariants() {
  const url = urls.assets();
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(({data})=> data);
};
export function fetchCryptoHistory({currencyId, selectedInterval}) {
  // // Get a date object for the current time
  // var start = new Date();
  // // Set it to one month ago
  // start.setMonth(start.getMonth() - 1);
  // // Zero the time component
  // start.setHours(0, 0, 0, 0);
  // const end = new Date();

  const {interval, start, end} = getRangeAndInterval(selectedInterval);
  const url = urls.history({
    currencyId,
    interval,
    start,
    end,
  });
    return axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(({data})=> data);
};