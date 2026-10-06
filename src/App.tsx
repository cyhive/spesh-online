import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scissors
} from 'lucide-react';
import { PRODUCTS, heroImg } from './data/products';
import { Product, ProductColor, CartItem, OrderDetails } from './types/store';
import { Currency, CURRENCIES, formatPrice } from './utils/currency';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookModal } from './components/LookbookModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCIES.USD);

  // Commerce State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  // Modal / Drawer States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor?: ProductColor,
    selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL',
    quantity: number = 1
  ) => {
    if (!product) return;
    const safeColor: ProductColor = selectedColor || product.colors?.[0] || {
      name: 'Standard',
      hex: '#18181A',
      label: 'Standard'
    };
    const safeSize: 'XS' | 'S' | 'M' | 'L' | 'XL' = selectedSize || product.sizes?.[0] || 'M';
    const safeQuantity = Math.max(1, quantity || 1);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product?.id === product.id &&
          item.selectedColor?.name === safeColor.name &&
          item.selectedSize === safeSize
      );

      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          { product, selectedColor: safeColor, selectedSize: safeSize, quantity: safeQuantity }
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prev) => prev.filter((_, i) => i !== index));
    } else {
      setCart((prev) =>
        prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Smooth scroll helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('atelier');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & Sorted Products
  const categories = ['All', 'Outerwear', 'Tailoring', 'Knitwear', 'Silk & Shirts', 'Trousers'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FAF9F6] text-[#18181A] flex flex-col font-sans selection:bg-[#18181A] selection:text-[#FAF9F6]">
      {/* Navigation Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onScrollToStory={scrollToStory}
        onScrollToCatalog={scrollToCatalog}
        activeCategory={activeCategory}
        currentCurrency={currentCurrency}
        onSelectCurrency={(c) => setCurrentCurrency(c)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Campaign Hero Showcase */}
        <Hero
          onExploreClick={scrollToCatalog}
          onLookbookClick={() => setIsLookbookOpen(true)}
        />

        {/* Continuous Editorial Marquee Ribbon */}
        <div className="relative overflow-hidden bg-[#18181A] text-[#FAF9F6] py-3.5 border-y border-white/10 select-none">
          <div className="flex w-fit whitespace-nowrap animate-[marquee_38s_linear_infinite]">
            <div className="flex items-center gap-8 text-[11px] tracking-[0.3em] uppercase font-light px-4">
              <span>Lanificio Virgin Wools</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>22 Momme Sandwashed Mulberry Silk</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Seamless 3D Whole-Garment Merino</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Rue Vivienne Hand-Draped Muslin</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Numbered Small-Batch Editions</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Zero Overstock Policy</span>
              <span aria-hidden="true" className="opacity-40">·</span>
            </div>
            <div className="flex items-center gap-8 text-[11px] tracking-[0.3em] uppercase font-light px-4" aria-hidden="true">
              <span>Lanificio Virgin Wools</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>22 Momme Sandwashed Mulberry Silk</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Seamless 3D Whole-Garment Merino</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Rue Vivienne Hand-Draped Muslin</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Numbered Small-Batch Editions</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>Zero Overstock Policy</span>
              <span aria-hidden="true" className="opacity-40">·</span>
            </div>
          </div>
        </div>

        {/* Featured Editorial Banner / Lookbook Callout with Parallax Depth */}
        <section className="bg-[#FAF9F6] border-b border-black/[0.06] py-14 lg:py-20 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="bg-[#F2EFE9] border border-black/10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
              <div className="max-w-xl z-10">
                <div className="text-xs tracking-[0.25em] uppercase text-[#18181A]/60 font-medium mb-3">
                  Autumn / Winter 2026 Collection
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#18181A] font-light leading-snug mb-4">
                  Interactive Lookbook Dossier
                </h2>
                <p className="text-sm text-[#18181A]/70 font-light leading-relaxed mb-6">
                  Browse complete studio silhouettes, study the movement of French-draped silks, and shop the looks directly from the editorial frames with zero friction.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLookbookOpen(true)}
                    className="px-7 py-3.5 bg-[#18181A] text-white hover:bg-black text-xs tracking-[0.2em] uppercase font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Compass size={15} />
                    <span>Launch Lookbook</span>
                  </button>
                </div>
              </div>

              {/* Parallax Floating Visual Vignettes */}
              <div className="flex items-center gap-4 sm:gap-6 z-10 w-full lg:w-auto justify-center lg:justify-end">
                <div className="w-36 sm:w-44 aspect-[3/4] bg-white border border-black/10 shadow-lg overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={PRODUCTS[1].primaryImage}
                    alt="Lookbook Silk Silhouette"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-40 sm:w-48 aspect-[3/4] bg-white border border-black/10 shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 -mt-6">
                  <img
                    src={PRODUCTS[0].primaryImage}
                    alt="Lookbook Overcoat Silhouette"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog-section" className="py-16 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Section Header & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/[0.08]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#18181A]/60 font-medium mb-2">
                Atelier Catalog
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#18181A] tracking-tight">
                Signature Silhouettes
              </h2>
            </div>

            {/* Total Count */}
            <div className="text-xs font-mono uppercase tracking-wider text-[#18181A]/60">
              <span className="font-bold text-[#18181A]">{filteredProducts.length}</span> Silhouettes Available
            </div>
          </div>

          {/* Interactive Filter Controls & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            {/* Filter Buttons (Functional Tabs) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-all border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#18181A] text-white border-[#18181A] font-semibold shadow-xs'
                      : 'bg-white text-[#18181A]/80 border-black/15 hover:border-black/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Minimalist Search Input */}
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Search fabric, style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-black/15 text-xs text-[#18181A] placeholder-black/40 focus:outline-none focus:border-[#18181A] transition-colors"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-white border border-black/15 text-xs text-[#18181A] tracking-wider uppercase focus:outline-none focus:border-[#18181A] cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-black/[0.08] bg-white p-8">
              <p className="font-serif text-2xl text-[#18181A] mb-2">No matching silhouettes found</p>
              <p className="text-xs text-[#18181A]/60 max-w-sm mx-auto mb-6">
                Try clearing your search query or switching to another category.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#18181A] text-white text-xs tracking-widest uppercase font-medium hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onQuickAdd={(p, color, size) => handleAddToCart(p, color, size, 1)}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  currency={currentCurrency}
                />
              ))}
            </div>
          )}
        </section>

        {/* Luxury Client Assurances Bar */}
        <section className="bg-white border-y border-black/[0.08] py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <Truck size={22} strokeWidth={1.3} className="text-[#18181A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#18181A] font-medium mb-1">Worldwide Courier</h4>
                  <p className="text-xs text-[#18181A]/65 font-light leading-relaxed">
                    Complimentary express dispatch on all orders over {formatPrice(350, currentCurrency)}. Carbon-neutral fleet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RotateCcw size={22} strokeWidth={1.3} className="text-[#18181A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#18181A] font-medium mb-1">30-Day Atelier Return</h4>
                  <p className="text-xs text-[#18181A]/65 font-light leading-relaxed">
                    Pre-paid return labels included inside every delivery parcel for seamless exchanges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck size={22} strokeWidth={1.3} className="text-[#18181A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#18181A] font-medium mb-1">Mill Provenance</h4>
                  <p className="text-xs text-[#18181A]/65 font-light leading-relaxed">
                    100% certified trace audit from Italian Lanificio spinning mills and French ateliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Scissors size={22} strokeWidth={1.3} className="text-[#18181A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#18181A] font-medium mb-1">Tailoring Consultation</h4>
                  <p className="text-xs text-[#18181A]/65 font-light leading-relaxed">
                    Virtual styling appointments and bespoke alteration allowances available to all clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier Craftsmanship & Story Section */}
        <StorySection onExploreCollection={scrollToCatalog} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Modals & Drawers */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((w) => w.id === quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          currency={currentCurrency}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        currency={currentCurrency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
        currency={currentCurrency}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cart}
          onOrderComplete={(order) => {
            setOrders((prev) => [order, ...prev]);
          }}
          onClearCart={handleClearCart}
          currency={currentCurrency}
        />
      )}

      {isLookbookOpen && (
        <LookbookModal
          isOpen={isLookbookOpen}
          onClose={() => setIsLookbookOpen(false)}
          onViewProduct={(id) => {
            const found = PRODUCTS.find((p) => p.id === id);
            if (found) setQuickViewProduct(found);
          }}
          currency={currentCurrency}
        />
      )}

      {isSizeGuideOpen && (
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}
    </div>
  );
}
