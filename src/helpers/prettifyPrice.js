import { numberFormat } from 'underscore.string';

let prettifyPrice = (number) => {
  // Dot; Nothing or Non Breaking Space; Thin Space; Rouble Sign;
  let decimalDelimeter = number < 10000 ? '' : '\u2009';
  return `${numberFormat(number, 0, ',', decimalDelimeter)}\u2009₽`;
};

export default prettifyPrice;
