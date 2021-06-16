import {cryptoHistoryIntervals} from '../utils/baseConstants'

/**
 * Get a value of a type properly formatted
 *
 * @param {n} the i18n $n function
 * @param {value} the value to be formatted
 * @param {type} the type of the field-> ['percentage','currency']
 * 
 * @return {String} the fild properly formatted
 */
export function formatPropValue({n, value, type}) {
  if (!value) return 'N/A';
  return {
    'string': ()=> value,
    'percentage': ()=> n(parseFloat(value)/100, 'percentage'),
    'currency': ()=> n(parseFloat(value), 'currency'),
    'integer': ()=> n(parseInt(value), 'integer'),
  }[type]() || value
}

/**
 * Get an object with an start date, end date and distance between points depending on the selectedInterval
 * @param {selectedInterval} Must be one defined in cryptoHistoryIntervals baseConstants
*/ 
export function getRangeAndInterval(selectedInterval) {
  // end date always is now
  const end = new Date();
  //start date depending on the interval
  const start = new Date();
  if (selectedInterval === cryptoHistoryIntervals.DAY) {
    // Set it to one day ago
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
  } else if (selectedInterval === cryptoHistoryIntervals.WEEK) {
    // Set it to one day ago
    start.setDate(start.getDate() - 15);
    start.setHours(0, 0, 0, 0);
  } else if (selectedInterval === cryptoHistoryIntervals.MONTH) {
    // Set it to one month ago
    start.setMonth(start.getMonth() - 1);
    start.setHours(0, 0, 0, 0);    
  }
  // The distance between points depending on the interval
  // Has to be one of those
  // m1, m5, m15, m30, h1, h2, h6, h12, d1
  const internalInterval = {
    [cryptoHistoryIntervals.DAY]: 'h1',
    [cryptoHistoryIntervals.WEEK]: 'h12',
    [cryptoHistoryIntervals.MONTH]: 'd1',
  }[selectedInterval] || 'd1'

  return {
    interval: internalInterval,
    start: start.getTime(),
    end: end.getTime(),
  }
}
