import axios from 'axios';


const urls = {
  assets: ()=> 'https://api.coincap.io/v2/assets',
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
