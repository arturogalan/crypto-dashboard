
/**
 * Get a cryptolist and merge it with an old one, comparing prices and tick the changed ones
 *
 * @param {oldCryptoList} the stored crypto list
 * @param {newCryptoList} the new crypto list retreived
 * 
 * 
 * @return {mergedCryptoList} the merged list
 */
export function mergeCryptoList(oldCryptoList, newCryptoList) {
  oldCryptoList.forEach((oldCrypto) => {
    const newCrypto = newCryptoList.find((crypto)=> crypto.id === oldCrypto.id);
    if (newCrypto) {
      ['priceUsd','changePercent24Hr'].forEach((fieldToUpdate)=>{
        oldCrypto[fieldToUpdate] = newCrypto[fieldToUpdate];
      })
    }
  });
}