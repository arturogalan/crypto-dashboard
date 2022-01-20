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
        'Accept-Encoding': 'gzip',
        'Authorization': `Bearer ${process.env.COINCAP_API_KEY}`,
      },
    }).then(({data})=> data);
};
export function fetchCryptoHistory({currencyId, selectedInterval}) {
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
        'Accept-Encoding': 'gzip',
        'Authorization': `Bearer ${process.env.COINCAP_API_KEY}`,
      },
    }).then(({data})=> data);
};