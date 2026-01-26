import { motion } from 'framer-motion';

export function PixIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.9 231.1 518.9 200.8 488.6L103.3 391.1H112.6C132.6 391.1 151.5 383.3 165.7 369.1L242.4 292.5zM262.5 218.9C257.1 224.3 247.8 224.3 242.4 218.9L165.7 142.2C151.5 128 132.6 120.2 112.6 120.2H103.3L200.2 23.3C230.5-7.1 279.7-7.1 310 23.3L407.1 120.4H392.6C372.6 120.4 353.7 128.2 339.5 142.4L262.5 218.9zM112.6 142.7C126.7 142.7 140.2 148.3 150.5 158.6L227.5 235.6C234.3 242.4 243.2 245.8 252.1 245.8C261 245.8 269.9 242.4 276.7 235.6L353.7 158.6C364 148.3 377.5 142.7 391.6 142.7H414.4L488 216.3C518.3 246.6 518.3 295.8 488 326.1L414.4 399.7H391.6C377.5 399.7 364 394.1 353.7 383.8L276.7 306.8C263.1 293.2 241.1 293.2 227.5 306.8L150.5 383.8C140.2 394.1 126.7 399.7 112.6 399.7H80L23.4 343.1C-6.9 312.8-6.9 263.6 23.4 233.3L80 176.7V142.7H112.6z"/>
    </svg>
  );
}

export function BitcoinLightningIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
    </svg>
  );
}

export function PaymentMethodsBadge() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 py-8"
    >
      <span className="text-sm text-muted-foreground">Pagamentos aceitos:</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 neon-border">
          <PixIcon className="w-5 h-5 text-[#32BCAD]" />
          <span className="text-sm font-medium">PIX</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 neon-border">
          <BitcoinLightningIcon className="w-5 h-5 text-[#F7931A]" />
          <span className="text-sm font-medium">Lightning</span>
        </div>
      </div>
    </motion.div>
  );
}
