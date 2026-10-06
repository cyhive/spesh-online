export interface Currency {
  code: string;
  symbol: string;
  label: string;
  rate: number; // Conversion rate from USD base
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1 },
  INR: { code: 'INR', symbol: '₹', label: 'INR (₹)', rate: 86.5 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', label: 'JPY (¥)', rate: 154 }
};

export function formatPrice(amountInUsd: number, currency: Currency): string {
  const converted = Math.round(amountInUsd * currency.rate);
  
  if (currency.code === 'INR') {
    // Format in Indian numbering system if applicable or standard readable
    return `${currency.symbol}${converted.toLocaleString('en-IN')}`;
  }
  
  return `${currency.symbol}${converted.toLocaleString('en-US')}`;
}
