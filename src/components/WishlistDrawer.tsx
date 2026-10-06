import React, { useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  currency?: Currency;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onQuickView,
  currency = CURRENCIES.USD
}) => {
  // Lock body & html scroll when wishlist drawer is open
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

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/55 backdrop-blur-xs flex justify-end transition-opacity duration-300"
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
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col border-l border-black/10 overflow-hidden"
        style={{
          height: '100%',
          maxHeight: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={18} strokeWidth={1.5} className="fill-[#18181A]" />
            <h2 className="font-serif text-xl tracking-wide uppercase text-[#18181A]">Saved Pieces</h2>
            <span className="font-mono text-xs tabular-nums text-[#18181A]/60">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-[#18181A]/60 hover:text-[#18181A] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-black/[0.06]">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <Heart size={36} strokeWidth={1} className="text-[#18181A]/30 mb-4" />
              <p className="font-serif text-xl text-[#18181A] mb-2">No Pieces Saved Yet</p>
              <p className="text-xs text-[#18181A]/60 max-w-xs mb-6 font-light">
                Click the heart icon on any silhouette to curate your private wishlist.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#18181A] text-white text-xs tracking-widest uppercase font-medium hover:bg-black transition-colors"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover object-center bg-[#F2EFE9] border border-black/5"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base font-normal text-[#18181A] line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        className="text-[#18181A]/40 hover:text-rose-700 transition-colors ml-2"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#18181A]/60 uppercase tracking-wider mt-1">
                      {product.category} · {product.origin}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono tabular-nums text-sm font-semibold text-[#18181A]">
                      {formatPrice(product.price, currency)}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="px-3 py-1.5 bg-[#18181A] text-white hover:bg-black text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={12} />
                      <span>View & Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-black/[0.08] bg-[#FAF9F6]">
            <p className="text-[11px] text-[#18181A]/60 text-center uppercase tracking-wider mb-3">
              Items saved in your session remain reserved for 14 days
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#18181A] text-[#18181A] hover:bg-[#18181A] hover:text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors text-center"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
