import React, { useState, useRef } from 'react';
import { Eye, Heart, Plus } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Product, ProductColor } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL') => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currency?: Currency;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
  currency = CURRENCIES.USD
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Micro-parallax on mouse movement
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3.5deg', '-3.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3.5deg', '3.5deg']);
  const imgTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-4px', '4px']);
  const imgTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-4px', '4px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const safeColor = selectedColor || product.colors?.[0] || { name: 'Noir', hex: '#141416', label: 'Noir' };
    const safeSize = product.sizes?.[1] || product.sizes?.[0] || 'M';
    onQuickAdd(product, safeColor, safeSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="group relative flex flex-col bg-[#FAF9F6] border border-black/[0.05] hover:border-black/[0.2] transition-colors duration-300 will-change-transform"
    >
      {/* Visual Slot Container (65-75% height) */}
      <div
        className="relative w-full aspect-[3/4] bg-[#F2EFE9] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {!imageError ? (
          <motion.div
            style={{
              x: imgTranslateX,
              y: imgTranslateY,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full will-change-transform"
          >
            <img
              src={product.primaryImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ) : (
          /* Zero-Broken-Image Policy Fallback Container */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#EDE8DF] to-[#DFD8CC] text-[#18181A]/70 text-center">
            <span className="font-serif italic text-2xl mb-2">Maison Vael</span>
            <span className="text-xs uppercase tracking-widest">{product.name}</span>
          </div>
        )}

        {/* Subtle Text Tag (at most 1) */}
        {product.isNewArrival && (
          <div className="absolute top-3.5 left-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#18181A] bg-white/90 backdrop-blur-xs px-2.5 py-1 z-10">
            New Edition
          </div>
        )}
        {!product.isNewArrival && product.isLimited && (
          <div className="absolute top-3.5 left-3.5 text-[10px] tracking-[0.2em] uppercase font-medium text-[#18181A]/80 bg-white/80 backdrop-blur-xs px-2.5 py-1 z-10">
            Limited Run
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center bg-white/85 hover:bg-white text-[#18181A] transition-colors shadow-xs z-10"
        >
          <Heart
            size={14}
            className={isWishlisted ? 'fill-[#18181A] text-[#18181A]' : 'text-[#18181A]'}
          />
        </button>

        {/* Hover Quick Actions Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 flex items-center gap-2 z-10 ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 py-2.5 bg-white text-[#18181A] hover:bg-[#FAF9F6] text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAddClick}
            className="px-3 py-2.5 bg-[#18181A] text-white hover:bg-black text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
            title="Quick add to bag"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Added to Bag Feedback Toast */}
        {addedToast && (
          <div className="absolute inset-x-3 bottom-3 bg-[#18181A] text-white text-xs py-2 text-center uppercase tracking-wider font-medium z-20 animate-fade-in">
            Added to Bag ({selectedColor.name})
          </div>
        )}
      </div>

      {/* Product Metadata Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white/60">
        <div>
          {/* Unboxed Metadata (Origin & Fabric) */}
          <div className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#18181A]/55 mb-1.5 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg sm:text-xl font-medium text-[#18181A] tracking-tight hover:opacity-75 transition-opacity cursor-pointer mb-1 line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#18181A]/65 line-clamp-1 mb-3 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Price & Color Swatches Row */}
        <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-sm sm:text-base font-semibold text-[#18181A]">
              {formatPrice(product.price, currency)}
            </span>
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                title={color.label}
                aria-label={`Select ${color.label}`}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === color.name
                    ? 'border-[#18181A] scale-125'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

