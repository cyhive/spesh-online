import React, { useState, useEffect } from 'react';
import { X, Heart, Check, ShieldCheck, RefreshCw, Ruler, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL', quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
  currency?: Currency;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
  currency = CURRENCIES.USD
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors?.[0] || { name: 'Noir', hex: '#141416', label: 'Noir' }
  );
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>(
    product?.sizes?.[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care'>('details');
  const [addedStatus, setAddedStatus] = useState(false);

  // Sync color & size whenever active product changes
  useEffect(() => {
    if (product) {
      if (product.colors?.[0]) setSelectedColor(product.colors[0]);
      if (product.sizes?.[0]) setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setAddedStatus(false);
    }
  }, [product]);

  // Lock body & html scroll when quick view is open
  useEffect(() => {
    if (product) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedStatus(true);
    setTimeout(() => {
      setAddedStatus(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 lg:p-8"
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
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#FAF9F6] w-full max-w-5xl shadow-2xl border border-black/10 overflow-hidden my-auto max-h-[calc(100%-1.5rem)] sm:max-h-[calc(100%-2.5rem)] flex flex-col md:flex-row min-h-0"
        style={{
          maxHeight: 'calc(100% - 1.5rem)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-white text-[#18181A] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left Column: Gallery Imagery */}
        <div className="w-full md:w-1/2 bg-[#F2EFE9] relative flex flex-col justify-center overflow-hidden min-h-[300px] md:min-h-[580px] shrink-0">
          <img
            src={product.primaryImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[580px]"
          />
          {/* Subtle Tag */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] tracking-widest uppercase font-semibold text-[#18181A]">
            {product.category} · {product.origin}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 lg:p-10 flex flex-col justify-between overflow-y-auto min-h-0">
          <div>
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#18181A]/60 font-medium mb-2">
              <span>{product.origin}</span>
              <span aria-hidden="true">·</span>
              <span>{product.fabric}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#18181A] tracking-tight mb-2">
              {product.name}
            </h2>

            {/* Price with Tabular Numerals */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#18181A]">
                {formatPrice(product.price, currency)}
              </span>
              <span className="text-xs text-[#18181A]/50 tracking-wider uppercase font-medium">
                VAT & Import Duties Included
              </span>
            </div>

            {/* Short Narrative Description */}
            <p className="text-sm leading-relaxed text-[#18181A]/75 mb-6 font-light">
              {product.description}
            </p>

            {/* Color Variant Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5 font-medium">
                <span className="text-[#18181A]/70">Color Palette:</span>
                <span className="text-[#18181A] font-semibold">{selectedColor.label}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 border text-xs tracking-wider transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#18181A] bg-black/[0.04]'
                        : 'border-black/15 hover:border-black/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector & Size Guide Link */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase mb-2.5 font-medium">
                <span className="text-[#18181A]/70">Selected Size:</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[#18181A] hover:underline cursor-pointer"
                >
                  <Ruler size={13} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-medium tracking-wider uppercase border transition-all ${
                      selectedSize === size
                        ? 'border-[#18181A] bg-[#18181A] text-white'
                        : 'border-black/15 bg-white text-[#18181A] hover:border-black/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#18181A]/60 mt-2 font-light italic">
                {product.fit}
              </p>
            </div>

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-black/20 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-sm hover:bg-[#FAF9F6] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 text-xs font-mono tabular-nums font-semibold min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-sm hover:bg-[#FAF9F6] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 text-xs tracking-[0.2em] uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  addedStatus
                    ? 'bg-emerald-800 text-white'
                    : 'bg-[#18181A] text-white hover:bg-black'
                }`}
              >
                {addedStatus ? (
                  <>
                    <Check size={16} />
                    <span>Added to Your Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Bag — {formatPrice(product.price * quantity, currency)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label="Save to Wishlist"
                className="p-3.5 border border-black/20 hover:border-black/60 bg-white transition-colors"
              >
                <Heart
                  size={16}
                  className={isWishlisted ? 'fill-[#18181A] text-[#18181A]' : 'text-[#18181A]'}
                />
              </button>
            </div>
          </div>

          {/* Accordion/Tabbed Specifications */}
          <div className="border-t border-black/10 pt-4">
            <div className="flex items-center gap-4 text-xs tracking-wider uppercase font-medium mb-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 transition-colors ${
                  activeTab === 'details'
                    ? 'border-b border-[#18181A] text-[#18181A] font-semibold'
                    : 'text-[#18181A]/50 hover:text-[#18181A]'
                }`}
              >
                Atelier Details
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-1 transition-colors ${
                  activeTab === 'materials'
                    ? 'border-b border-[#18181A] text-[#18181A] font-semibold'
                    : 'text-[#18181A]/50 hover:text-[#18181A]'
                }`}
              >
                Provenance
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-1 transition-colors ${
                  activeTab === 'care'
                    ? 'border-b border-[#18181A] text-[#18181A] font-semibold'
                    : 'text-[#18181A]/50 hover:text-[#18181A]'
                }`}
              >
                Garment Care
              </button>
            </div>

            <div className="text-xs text-[#18181A]/70 leading-relaxed min-h-[64px]">
              {activeTab === 'details' && (
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'materials' && (
                <div>
                  <p className="font-medium text-[#18181A] mb-1">{product.fabric}</p>
                  <p>Milled in {product.origin} under certified OEKO-TEX® & Responsible Wool Standards.</p>
                </div>
              )}
              {activeTab === 'care' && (
                <ul className="list-disc list-inside space-y-1">
                  {product.care.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#18181A]/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} /> Authenticity Guaranteed
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw size={13} /> 30-Day Complimentary Returns
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
