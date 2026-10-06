import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_LOOKS } from '../data/products';
import { Product } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (productId: string) => void;
  currency?: Currency;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onViewProduct,
  currency = CURRENCIES.USD
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Lock body & html scroll when lookbook is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentLook = LOOKBOOK_LOOKS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? LOOKBOOK_LOOKS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === LOOKBOOK_LOOKS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        maxHeight: '100%',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl h-full max-h-[calc(100%-1.5rem)] sm:max-h-[calc(100%-2.5rem)] bg-[#18181A] text-[#FAF9F6] border border-white/10 flex flex-col lg:flex-row overflow-hidden shadow-2xl"
        style={{
          maxHeight: 'calc(100% - 1.5rem)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close lookbook"
          className="absolute top-5 right-5 z-30 w-10 h-10 bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left Column: High-Resolution Visual Gallery */}
        <div className="w-full lg:w-7/12 h-[55%] lg:h-full relative bg-neutral-900 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentLook.id}
              src={currentLook.image}
              alt={currentLook.title}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center absolute inset-0"
            />
          </AnimatePresence>

          {/* Look Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center z-20">
            <button
              onClick={handlePrev}
              aria-label="Previous look"
              className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors border border-white/15 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center z-20">
            <button
              onClick={handleNext}
              aria-label="Next look"
              className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-xs transition-colors border border-white/15 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicator Counter */}
          <div className="absolute bottom-4 left-6 bg-black/60 backdrop-blur-xs px-3 py-1 text-xs font-mono tabular-nums text-white/90 border border-white/10 z-20">
            {activeIndex + 1} / {LOOKBOOK_LOOKS.length}
          </div>
        </div>

        {/* Right Column: Editorial Dossier & Direct Shopping */}
        <div className="w-full lg:w-5/12 h-[45%] lg:h-full p-6 sm:p-10 flex flex-col justify-between overflow-y-auto bg-[#18181A]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 mb-2 font-medium">
              <span>{currentLook.season}</span>
              <span aria-hidden="true">·</span>
              <span>Editorial Series</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight mb-4">
              {currentLook.title}
            </h2>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed font-light mb-8">
              {currentLook.description}
            </p>
          </div>

          {/* Shop Featured Silhouette Card */}
          <div className="border border-white/15 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-widest text-white/50 mb-2">Featured Piece</div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-serif text-lg text-white font-medium">{currentLook.productName}</h4>
                <div className="font-mono tabular-nums text-sm text-white/80">{formatPrice(currentLook.price, currency)}</div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onViewProduct(currentLook.productId);
              }}
              className="w-full py-3 bg-[#FAF9F6] text-[#18181A] hover:bg-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye size={14} />
              <span>Inspect & Shop Silhouette</span>
            </button>
          </div>

          {/* Thumbnails strip */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-3">
            {LOOKBOOK_LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-16 border overflow-hidden transition-all relative ${
                  activeIndex === idx ? 'border-white ring-1 ring-white' : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
