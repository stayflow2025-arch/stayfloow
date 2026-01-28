
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'DZD' | 'USD' | 'EUR' | 'GBP' | 'CHF' | 'EGP';

const conversionRates: Record<Currency, number> = {
  DZD: 1,
  USD: 1 / 134.5,
  EUR: 1 / 145.2,
  GBP: 1 / 171.1,
  CHF: 1 / 150.5,
  EGP: 1 / 2.85,
};

const currencySymbols: Record<Currency, string> = {
    DZD: 'DA',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CHF: 'CHF',
    EGP: 'E£'
};

const currencyFlags: Record<Currency, string> = {
    DZD: '🇩🇿',
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    CHF: '🇨🇭',
    EGP: '🇪🇬'
};


interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInDZD: number, isRawValue?: boolean) => string;
  convertFromDZD: (priceInDZD: number) => number;
  getCurrencySymbol: (curr?: Currency) => string;
  getCurrencyFlag: (curr?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('DZD');

  const convertFromDZD = (priceInDZD: number) => {
    return priceInDZD * conversionRates[currency];
  };
  
  const getCurrencySymbol = (curr?: Currency) => {
    return currencySymbols[curr || currency];
  }

  const getCurrencyFlag = (curr?: Currency) => {
    return currencyFlags[curr || currency];
  }

  const formatPrice = (priceInDZD: number, isRawValue = false) => {
    const rate = conversionRates[currency];
    const convertedPrice = priceInDZD * rate;
    const symbol = currencySymbols[currency];
    
    // isRawValue is used for the filter slider which should not have the currency symbol
    if (isRawValue) {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(convertedPrice);
    }
    
    if (currency === 'DZD') {
         return new Intl.NumberFormat('fr-DZ', {
            style: 'currency',
            currency: 'DZD',
            currencyDisplay: 'narrowSymbol',
            minimumFractionDigits: 0,
        }).format(convertedPrice);
    }

    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertFromDZD, getCurrencySymbol, getCurrencyFlag }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
