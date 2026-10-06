import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  currency?: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency = CURRENCIES.USD
}) => {
  // Lock body & html scroll when drawer is open to prevent page scrolling behind drawer
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

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 350;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity duration-300"
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
        {/* Header - strictly anchored with prominent quick checkout action */}
        <div className="p-4 sm:p-5 border-b border-black/[0.08] flex items-center justify-between shrink-0 bg-[#FAF9F6] z-10 gap-2">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <h2 className="font-serif text-lg sm:text-xl tracking-wide uppercase text-[#18181A]">Shopping Bag</h2>
            <span className="font-mono text-xs tabular-nums text-[#18181A]/60">
              ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="py-1.5 px-3 bg-[#18181A] text-white hover:bg-black text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap active:scale-95"
              >
                <span>Checkout</span>
                <ArrowRight size={12} />
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-1.5 text-[#18181A]/60 hover:text-[#18181A] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Free Shipping Calculator - strictly anchored */}
        <div className="bg-[#F2EFE9] px-4 sm:px-5 py-2.5 border-b border-black/[0.06] shrink-0 z-10">
          <div className="flex justify-between items-center text-[11px] sm:text-xs tracking-wider uppercase mb-1">
            <span className="text-[#18181A]/70 font-medium">
              {remainingForFreeShipping === 0
                ? 'Complimentary Express Courier Unlocked'
                : `Add ${formatPrice(remainingForFreeShipping, currency)} for Free Delivery`}
            </span>
            <span className="font-mono tabular-nums text-[11px] font-semibold">
              {Math.round(shippingProgress)}%
            </span>
          </div>
          <div className="w-full h-1 bg-black/10 overflow-hidden">
            <div
              className="h-full bg-[#18181A] transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable Body containing Items & Direct Checkout Block */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {/* Items List */}
          <div className="p-4 sm:p-5 divide-y divide-black/[0.06]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag size={36} strokeWidth={1} className="text-[#18181A]/30 mb-4" />
                <p className="font-serif text-xl text-[#18181A] mb-2">Your Bag is Empty</p>
                <p className="text-xs text-[#18181A]/60 max-w-xs mb-6 font-light">
                  Discover our signature pieces crafted from Biella virgin wool and Mulberry silk.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#18181A] text-white text-xs tracking-widest uppercase font-medium hover:bg-black transition-colors"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product?.id || idx}-${item.selectedColor?.name || 'color'}-${item.selectedSize}`} className="py-3.5 first:pt-0 last:pb-0 flex gap-3.5">
                  <img
                    src={item.product?.primaryImage}
                    alt={item.product?.name || 'Item'}
                    referrerPolicy="no-referrer"
                    className="w-18 h-22 object-cover object-center bg-[#F2EFE9] border border-black/5 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base font-normal text-[#18181A] line-clamp-1">
                          {item.product?.name || 'Garment'}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          aria-label="Remove item"
                          className="text-[#18181A]/40 hover:text-rose-700 transition-colors ml-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#18181A]/60 tracking-wider uppercase mt-1">
                        <span>Size: {item.selectedSize}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.selectedColor?.hex || '#18181A' }}
                          />
                          {item.selectedColor?.name || 'Standard'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5">
                      {/* Stepper */}
                      <div className="flex items-center border border-black/15 bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 font-mono tabular-nums font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-sm font-semibold text-[#18181A]">
                        {formatPrice((item.product?.price || 0) * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Primary Checkout & Subtotal Block - Sits directly below items, guaranteed in view */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-black/[0.08] bg-white/70 shadow-sm mx-4 sm:mx-5 mb-5 space-y-3">
              <div className="space-y-1.5 text-xs tracking-wider uppercase">
                <div className="flex justify-between text-[#18181A]/70">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-[#18181A]">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[#18181A]/70">
                  <span>Courier Delivery</span>
                  <span>{subtotal >= freeShippingThreshold ? 'Complimentary' : formatPrice(25, currency)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#18181A]/50">
                  <span>Taxes & Duties</span>
                  <span>Included in price</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-black/10 flex justify-between items-baseline">
                <span className="text-xs font-semibold tracking-widest uppercase">Estimated Total</span>
                <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-[#18181A]">
                  {formatPrice(subtotal + (subtotal >= freeShippingThreshold ? 0 : 25), currency)}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#18181A] text-white hover:bg-black active:scale-[0.99] text-xs tracking-[0.2em] uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="text-center text-[10px] text-[#18181A]/50 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck size={12} />
                <span>Encrypted checkout · Insured global delivery</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
