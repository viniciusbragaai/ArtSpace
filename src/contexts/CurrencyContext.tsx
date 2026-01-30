import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CurrencyContextType {
  exchangeRate: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  convertToUSD: (brl: number) => number;
  convertToBRL: (usd: number) => number;
  refetch: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [exchangeRate, setExchangeRate] = useState<number>(5.50); // Default fallback
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchExchangeRate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      
      const data = await response.json();
      const brlRate = data.rates.BRL;
      
      if (brlRate) {
        setExchangeRate(brlRate);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Exchange rate fetch error:', err);
      setError('Erro ao buscar cotação');
      // Keep using the fallback rate
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRate();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchExchangeRate]);

  const convertToBRL = useCallback((usd: number) => {
    return usd * exchangeRate;
  }, [exchangeRate]);

  const convertToUSD = useCallback((brl: number) => {
    return brl / exchangeRate;
  }, [exchangeRate]);

  return (
    <CurrencyContext.Provider 
      value={{ 
        exchangeRate, 
        isLoading, 
        error, 
        lastUpdated,
        convertToUSD,
        convertToBRL,
        refetch: fetchExchangeRate
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
