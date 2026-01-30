import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, AlertCircle, DollarSign } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export function ExchangeRateDisplay() {
  const { exchangeRate, isLoading, error, refetch } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg glass min-h-[44px] touch-manipulation"
    >
      {error ? (
        <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
      ) : (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-artist-primary/20 flex-shrink-0">
          <DollarSign className="w-3 h-3 text-artist-primary" />
        </div>
      )}
      
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground hidden sm:inline">1 USD</span>
        <span className="text-muted-foreground hidden sm:inline">=</span>
        <span className="font-mono font-semibold text-sm text-foreground tabular-nums">
          {isLoading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            `R$ ${exchangeRate.toFixed(2)}`
          )}
        </span>
      </div>

      <button
        onClick={refetch}
        className="p-1.5 hover:bg-muted rounded-md transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center touch-manipulation"
        title="Atualizar cotação"
      >
        <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground hover:text-foreground ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </motion.div>
  );
}
