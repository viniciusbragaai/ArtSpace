import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export function ExchangeRateDisplay() {
  const { exchangeRate, isLoading, error, refetch } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50 text-sm"
    >
      {error ? (
        <AlertCircle className="w-3.5 h-3.5 text-destructive" />
      ) : (
        <TrendingUp className="w-3.5 h-3.5 text-artist-primary" />
      )}
      
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground text-xs">USD/BRL</span>
        <span className="font-medium text-foreground">
          {isLoading ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            `R$ ${exchangeRate.toFixed(2)}`
          )}
        </span>
      </div>

      <button
        onClick={refetch}
        className="p-0.5 hover:bg-muted rounded transition-colors"
        title="Atualizar cotação"
      >
        <RefreshCw className={`w-3 h-3 text-muted-foreground hover:text-foreground ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </motion.div>
  );
}
