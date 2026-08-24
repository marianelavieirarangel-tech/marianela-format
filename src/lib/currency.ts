export type CurrencyCode = 'PEN' | 'USD' | 'EUR';

export const currencyOptions: CurrencyCode[] = ['PEN', 'USD', 'EUR'];

export const currencyRates: Record<CurrencyCode, number> = {
  PEN: 1,
  USD: 0.26,
  EUR: 0.24,
};

export const currencySymbols: Record<CurrencyCode, string> = {
  PEN: 'S/',
  USD: 'US$',
  EUR: '€',
};

export function formatPrice(value: number, currency: CurrencyCode) {
  const converted = value * currencyRates[currency];
  const decimals = currency === 'PEN' ? 0 : 2;
  return `${currencySymbols[currency]} ${converted.toFixed(decimals)}`;
}
