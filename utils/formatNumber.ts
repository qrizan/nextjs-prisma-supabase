export const formatNumber = (number: number, locale: string = 'en-US', options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat(locale, options).format(number);
};