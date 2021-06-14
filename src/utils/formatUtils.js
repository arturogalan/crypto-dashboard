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
