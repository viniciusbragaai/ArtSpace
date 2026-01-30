import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function BottomSheet({ isOpen, onClose, children, title, className }: BottomSheetProps) {
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.velocity.y > 300 || info.offset.y > 100) {
      onClose();
    }
  };

  // Prevent body scroll when sheet is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-2xl",
              "bg-card border-t border-x border-border shadow-xl",
              "safe-area-bottom",
              className
            )}
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
