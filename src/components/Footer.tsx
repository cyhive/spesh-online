import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenLookbook: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenLookbook,
  onOpenSizeGuide
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#18181A] text-[#FAF9F6] border-t border-black/20 pt-16 lg:pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.2em] uppercase font-semibold text-white">
              Maison Vael
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Contemporary wardrobe architecture defined by uncompromised fiber provenance, organic draping, and small-batch editions crafted in family-owned European mills.
            </p>
            <div className="pt-2 text-xs text-white/50 tracking-wider uppercase font-mono">
              Paris · Milan · Tokyo · New York
            </div>
          </div>

          {/* Catalog Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/90 font-medium">
              Wardrobe
            </h4>
            <ul className="space-y-2 text-xs tracking-wider text-white/60 font-light">
              <li>
                <button
                  onClick={() => onSelectCategory('Outerwear')}
                  className="hover:text-white transition-colors"
                >
                  Outerwear & Coats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Tailoring')}
                  className="hover:text-white transition-colors"
                >
                  Tailored Blazers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Knitwear')}
                  className="hover:text-white transition-colors"
                >
                  Merino & Cashmere Knits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Silk & Shirts')}
                  className="hover:text-white transition-colors"
                >
                  Sandwashed Silk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Trousers')}
                  className="hover:text-white transition-colors"
                >
                  Wide Pleat Trousers
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/90 font-medium">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs tracking-wider text-white/60 font-light">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors"
                >
                  Sizing & Measurements
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLookbook}
                  className="hover:text-white transition-colors"
                >
                  A/W 2026 Lookbook
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Complimentary Returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Garment Preservation Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Bespoke Atelier Appointments
                </span>
              </li>
            </ul>
          </div>

          {/* Private Newsletter Invitation */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/90 font-medium">
              The Atelier Gazette
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Subscribers receive early access to new small-batch editions 48 hours prior to public release.
            </p>
            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex border-b border-white/30 focus-within:border-white transition-colors pb-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none flex-1 tracking-wider"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-white/70 hover:text-white transition-colors pl-2"
                >
                  {subscribed ? <Check size={16} className="text-emerald-400" /> : <ArrowRight size={16} />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2">
                  Invitation confirmed. Thank you.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/45 tracking-wider uppercase">
          <div>
            © {new Date().getFullYear()} Maison Vael S.A.S. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="hover:text-white/80 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">Fiber Traceability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
