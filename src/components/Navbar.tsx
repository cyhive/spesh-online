import React, { useState } from 'react';
import { ShoppingBag, Heart, X, ChevronDown, Check, Globe } from 'lucide-react';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: string) => void;
  onOpenLookbook: () => void;
  onScrollToStory: () => void;
  onScrollToCatalog: () => void;
  activeCategory: string;
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  onOpenLookbook,
  onScrollToStory,
  onScrollToCatalog,
  activeCategory,
  currentCurrency,
  onSelectCurrency
}) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currenciesList = Object.values(CURRENCIES);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      {/* Slim Promotional Announcement Ribbon */}
      {showAnnouncement && (
        <div className="relative bg-[#18181A] text-[#FAF9F6] text-[11px] tracking-widest uppercase px-4 py-2 flex items-center justify-center text-center font-medium">
          <span>Complimentary express courier & import duties included on orders over {formatPrice(350, currentCurrency)}</span>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss announcement"
            className="absolute right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Actions) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onScrollToCatalog}
            className="text-left font-serif text-xl sm:text-2xl lg:text-[28px] tracking-[0.18em] sm:tracking-[0.2em] uppercase font-semibold text-[#18181A] hover:opacity-85 transition-opacity whitespace-nowrap cursor-pointer"
          >
            Maison Vael
          </button>
        </div>

        {/* Zone 2: 4-6 nav links, shown on large desktop screens, clean and balanced */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-[13px] tracking-wider uppercase text-[#18181A]/80 font-medium">
          <button
            onClick={() => {
              onSelectCategory('All');
              onScrollToCatalog();
            }}
            className={`transition-colors hover:text-[#18181A] relative py-1 cursor-pointer whitespace-nowrap ${
              activeCategory === 'All' ? 'text-[#18181A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#18181A]' : ''
            }`}
          >
            Collection
          </button>
          <button
            onClick={() => {
              onSelectCategory('Tailoring');
              onScrollToCatalog();
            }}
            className={`transition-colors hover:text-[#18181A] relative py-1 cursor-pointer whitespace-nowrap ${
              activeCategory === 'Tailoring' ? 'text-[#18181A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#18181A]' : ''
            }`}
          >
            Tailoring
          </button>
          <button
            onClick={() => {
              onSelectCategory('Knitwear');
              onScrollToCatalog();
            }}
            className={`transition-colors hover:text-[#18181A] relative py-1 cursor-pointer whitespace-nowrap ${
              activeCategory === 'Knitwear' ? 'text-[#18181A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#18181A]' : ''
            }`}
          >
            Knitwear
          </button>
          <button
            onClick={onOpenLookbook}
            className="transition-colors hover:text-[#18181A] relative py-1 cursor-pointer whitespace-nowrap"
          >
            Lookbook
          </button>
          <button
            onClick={onScrollToStory}
            className="transition-colors hover:text-[#18181A] relative py-1 cursor-pointer whitespace-nowrap"
          >
            Atelier
          </button>
        </nav>

        {/* Zone 3: Primary actions - strictly shrink-0 and responsive */}
        <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 shrink-0">
          {/* Currency selector including INR (₹) */}
          <div className="relative hidden md:block shrink-0">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center gap-1.5 text-xs tracking-wider text-[#18181A]/80 hover:text-[#18181A] transition-colors py-1 uppercase cursor-pointer font-medium"
            >
              <span>{currentCurrency.code} ({currentCurrency.symbol})</span>
              <ChevronDown size={12} className={`transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-black/[0.08] shadow-lg rounded-none py-1 z-50">
                {currenciesList.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onSelectCurrency(c);
                      setIsCurrencyOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs tracking-wider hover:bg-[#FAF9F6] flex items-center justify-between cursor-pointer"
                  >
                    <span>{c.label}</span>
                    {currentCurrency.code === c.code && <Check size={12} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="relative p-1.5 sm:p-2 text-[#18181A]/80 hover:text-[#18181A] transition-colors shrink-0 cursor-pointer"
          >
            <Heart size={18} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 text-[10px] bg-[#18181A] text-white flex items-center justify-center px-1 font-mono tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Bag"
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-2.5 sm:px-3 border border-[#18181A]/20 hover:border-[#18181A] text-xs tracking-widest uppercase transition-all shrink-0 whitespace-nowrap bg-white/50 hover:bg-white cursor-pointer"
          >
            <ShoppingBag size={15} strokeWidth={1.5} />
            <span className="font-medium hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-xs font-semibold">({cartCount})</span>
          </button>

          {/* Tablet & Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#18181A] shrink-0 cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-[#18181A] transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-[#18181A] transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-[#18181A] transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-[#FAF9F6] px-6 py-5 flex flex-col gap-4 text-xs tracking-widest uppercase font-medium animate-fade-in shadow-md">
          {/* Currency Switcher in mobile/tablet menu */}
          <div className="pb-3 border-b border-black/[0.06]">
            <span className="text-[10px] tracking-widest text-[#18181A]/50 block mb-2">Select Currency</span>
            <div className="flex flex-wrap gap-1.5">
              {currenciesList.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onSelectCurrency(c)}
                  className={`px-2.5 py-1 text-[11px] border cursor-pointer transition-colors ${
                    currentCurrency.code === c.code
                      ? 'bg-[#18181A] text-white border-[#18181A]'
                      : 'bg-white text-[#18181A] border-black/15'
                  }`}
                >
                  {c.code} ({c.symbol})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onSelectCategory('All');
              onScrollToCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-black/[0.04] cursor-pointer"
          >
            All Collections
          </button>
          <button
            onClick={() => {
              onSelectCategory('Tailoring');
              onScrollToCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-black/[0.04] cursor-pointer"
          >
            Tailoring & Blazers
          </button>
          <button
            onClick={() => {
              onSelectCategory('Outerwear');
              onScrollToCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-black/[0.04] cursor-pointer"
          >
            Outerwear & Coats
          </button>
          <button
            onClick={() => {
              onSelectCategory('Knitwear');
              onScrollToCatalog();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-black/[0.04] cursor-pointer"
          >
            Sculptural Knitwear
          </button>
          <button
            onClick={() => {
              onOpenLookbook();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-black/[0.04] cursor-pointer"
          >
            Lookbook A/W 2026
          </button>
          <button
            onClick={() => {
              onScrollToStory();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 cursor-pointer"
          >
            Atelier & Mills
          </button>
        </div>
      )}
    </header>
  );
};
