import { numberFormat } from 'underscore.string';

let prettifyPrice = (number) => {
  // Dot; Nothing or Non Breaking Space; Thin Space; Rouble Sign;
  let decimalDelimeter = number < 10000 ? '' : ' ';
  return `${numberFormat(number, 0, '.', decimalDelimeter)} ₽`;
};

export default prettifyPrice;
