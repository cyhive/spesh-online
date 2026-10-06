import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, Lock, ArrowLeft, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/store';
import { Currency, CURRENCIES, formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: OrderDetails) => void;
  onClearCart: () => void;
  currency?: Currency;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
  onClearCart,
  currency = CURRENCIES.USD
}) => {
  const [step, setStep] = useState<'checkout' | 'confirmation'>('checkout');
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '740 Park Avenue, Apt 11B',
    city: 'New York',
    postalCode: '10021',
    country: 'United States',
    paymentMethod: 'card' as 'card' | 'cod' | 'apple_pay',
    deliveryMethod: 'express' as 'express' | 'white_glove',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset to checkout step whenever opened
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Lock body & html scroll when checkout is open
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

  const subtotal = items?.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0) || 0;
  const shippingFee = subtotal >= 350 ? 0 : 25;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `MV-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        items: [...items],
        subtotal,
        shipping: shippingFee,
        total,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };

      setConfirmedOrder(order);
      onOrderComplete(order);
      onClearCart();
      setIsSubmitting(false);
      setStep('confirmation');
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in"
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
      <div
        className="relative bg-[#FAF9F6] w-full max-w-4xl shadow-2xl border border-black/10 overflow-hidden my-auto h-full max-h-[min(90%,640px)] flex flex-col min-h-0"
        style={{
          maxHeight: 'min(90%, 640px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - strictly anchored with top action */}
        <div className="p-4 sm:p-5 lg:p-6 border-b border-black/[0.08] flex items-center justify-between bg-white shrink-0 z-10 gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {step === 'checkout' && (
              <>
                <span className="font-serif text-lg sm:text-2xl tracking-wide uppercase text-[#18181A]">
                  Atelier Checkout
                </span>
                <span className="font-mono text-xs text-[#18181A]/60 hidden sm:inline">
                  ({formatPrice(total + (formData.deliveryMethod === 'white_glove' ? 45 : 0), currency)})
                </span>
              </>
            )}
            {step === 'confirmation' && (
              <span className="font-serif text-lg sm:text-2xl tracking-wide uppercase text-[#18181A]">
                Order Confirmed
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || items.length === 0}
                className="py-1.5 px-3 bg-[#18181A] text-white hover:bg-black text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap disabled:opacity-50 active:scale-95"
              >
                <Lock size={11} />
                <span>{isSubmitting ? 'Authorizing...' : 'Confirm'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="p-1.5 text-[#18181A]/60 hover:text-[#18181A] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {step === 'checkout' ? (
          <form id="checkout-form" onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Scrollable Form Body with min-h-0 */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Left Column: Client & Shipping Details */}
              <div className="xl:col-span-7 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#18181A] mb-4 pb-1 border-b border-black/[0.08]">
                  01. Contact & Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">Email for Receipt</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">Phone (Courier SMS)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#18181A]/70 uppercase tracking-wider mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full p-2.5 bg-white border border-black/15 focus:border-[#18181A] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#18181A] mb-3 pb-1 border-b border-black/[0.08]">
                  02. Courier Delivery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    className={`p-3.5 text-left border text-xs transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-[#18181A] bg-white shadow-xs'
                        : 'border-black/10 bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium mb-1">
                      <span>DHL Express Courier</span>
                      <span className="font-mono tabular-nums">{shippingFee === 0 ? 'Free' : formatPrice(shippingFee, currency)}</span>
                    </div>
                    <p className="text-[11px] text-[#18181A]/60">2-3 business days · Carbon-neutral fleet</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'white_glove' })}
                    className={`p-3.5 text-left border text-xs transition-all ${
                      formData.deliveryMethod === 'white_glove'
                        ? 'border-[#18181A] bg-white shadow-xs'
                        : 'border-black/10 bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium mb-1">
                      <span>Atelier White Glove</span>
                      <span className="font-mono tabular-nums">+{formatPrice(45, currency)}</span>
                    </div>
                    <p className="text-[11px] text-[#18181A]/60">Hand-delivered in breathable garment bag</p>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#18181A] mb-3 pb-1 border-b border-black/[0.08]">
                  03. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2 px-3 text-xs tracking-wider uppercase border transition-all flex items-center justify-center gap-1.5 ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#18181A] bg-[#18181A] text-white'
                        : 'border-black/15 bg-white text-[#18181A]'
                    }`}
                  >
                    <CreditCard size={14} />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                    className={`py-2 px-3 text-xs tracking-wider uppercase border transition-all flex items-center justify-center gap-1.5 ${
                      formData.paymentMethod === 'apple_pay'
                        ? 'border-[#18181A] bg-[#18181A] text-white'
                        : 'border-black/15 bg-white text-[#18181A]'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`py-2 px-3 text-xs tracking-wider uppercase border transition-all flex items-center justify-center gap-1.5 ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#18181A] bg-[#18181A] text-white'
                        : 'border-black/15 bg-white text-[#18181A]'
                    }`}
                  >
                    <Truck size={14} />
                    <span>COD</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-4 bg-white border border-black/10 space-y-3 text-xs">
                    <div>
                      <label className="block text-[#18181A]/70 uppercase mb-1">Card Number</label>
                      <input
                        type="text"
                        readOnly
                        value={formData.cardNumber}
                        className="w-full p-2 bg-[#FAF9F6] border border-black/10 font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#18181A]/70 uppercase mb-1">Expires</label>
                        <input
                          type="text"
                          readOnly
                          value={formData.cardExp}
                          className="w-full p-2 bg-[#FAF9F6] border border-black/10 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#18181A]/70 uppercase mb-1">CVC</label>
                        <input
                          type="text"
                          readOnly
                          value={formData.cardCvc}
                          className="w-full p-2 bg-[#FAF9F6] border border-black/10 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#F2EFE9] border border-black/10 text-xs text-[#18181A]/80 leading-relaxed">
                    <p className="font-semibold text-[#18181A] mb-1">Cash on Delivery Verification</p>
                    <p>
                      Payment of <span className="font-mono font-semibold">{formatPrice(total, currency)}</span> will be settled upon courier delivery. An SMS confirmation will be dispatched to your phone before dispatch.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="xl:col-span-5 bg-white p-6 border border-black/[0.08] flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#18181A] mb-4 pb-1 border-b border-black/[0.08]">
                  Order Items ({items.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>

                <div className="divide-y divide-black/[0.06] max-h-[260px] overflow-y-auto mb-6 pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-3 flex gap-3 text-xs">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-15 object-cover bg-[#F2EFE9]"
                      />
                      <div className="flex-1">
                        <div className="font-serif text-sm text-[#18181A] line-clamp-1">{item.product.name}</div>
                        <div className="text-[11px] text-[#18181A]/60">
                          {item.selectedSize} · {item.selectedColor?.name || 'Standard'} · Qty {item.quantity}
                        </div>
                        <div className="font-mono tabular-nums text-xs font-semibold mt-1">
                          {formatPrice(item.product.price * item.quantity, currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs tracking-wider uppercase border-t border-black/10 pt-4">
                  <div className="flex justify-between text-[#18181A]/70">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums font-semibold">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[#18181A]/70">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, currency)}</span>
                  </div>
                  {formData.deliveryMethod === 'white_glove' && (
                    <div className="flex justify-between text-[#18181A]/70">
                      <span>White Glove Service</span>
                      <span className="font-mono tabular-nums">+{formatPrice(45, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-[#18181A]/50">
                    <span>Duties & Insurance</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="border-t border-black/15 pt-3 mt-3 flex justify-between items-baseline mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase">Total Amount</span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-[#18181A]">
                    {formatPrice(total + (formData.deliveryMethod === 'white_glove' ? 45 : 0), currency)}
                  </span>
                </div>
              </div>

              {/* Desktop Submit Button (In right column on large desktop) */}
              <div className="hidden xl:block">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 bg-[#18181A] text-white hover:bg-black disabled:opacity-50 text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock size={13} />
                  <span>
                    {isSubmitting
                      ? 'Authorizing Transaction...'
                      : `Confirm & Place Order — ${formatPrice(total + (formData.deliveryMethod === 'white_glove' ? 45 : 0), currency)}`}
                  </span>
                </button>

                <div className="mt-3 text-center text-[10px] text-[#18181A]/50 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} />
                  <span>256-bit SSL encrypted · Verified atelier dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet & Mobile Sticky Bottom Checkout Bar (Always visible without scrolling outside) */}
          <div className="xl:hidden p-3.5 sm:p-4 bg-white border-t border-black/10 shrink-0 z-20 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#18181A]/60 block font-medium">Total Amount</span>
                <span className="font-mono tabular-nums text-base sm:text-lg font-bold text-[#18181A]">
                  {formatPrice(total + (formData.deliveryMethod === 'white_glove' ? 45 : 0), currency)}
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="py-3 px-4 sm:px-6 bg-[#18181A] text-white hover:bg-black disabled:opacity-50 text-xs tracking-[0.16em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
              >
                <Lock size={12} />
                <span>{isSubmitting ? 'Authorizing...' : 'Confirm Order'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Post-Order Confirmation State */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto my-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-6">
              <PackageCheck size={32} />
            </div>

            <div className="text-xs uppercase tracking-[0.25em] text-[#18181A]/60 font-medium mb-2">
              Receipt & Confirmation
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#18181A] font-light mb-3">
              Order {confirmedOrder?.orderId} Confirmed
            </h2>

            <p className="text-sm text-[#18181A]/75 leading-relaxed font-light mb-8">
              Thank you, {confirmedOrder?.customerName}. An official receipt and tracking dossier have been dispatched to{' '}
              <span className="font-medium text-[#18181A]">{confirmedOrder?.email}</span>. Our atelier team in Paris is preparing your garments.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-white border border-black/10 p-5 text-left text-xs mb-8 space-y-2.5">
              <div className="flex justify-between border-b border-black/[0.06] pb-2 font-medium">
                <span className="text-[#18181A]/60 uppercase">Delivery Destination</span>
                <span className="text-[#18181A]">{confirmedOrder?.address}, {confirmedOrder?.city}</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.06] pb-2 font-medium">
                <span className="text-[#18181A]/60 uppercase">Payment Settled Via</span>
                <span className="text-[#18181A] uppercase">{confirmedOrder?.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.06] pb-2 font-medium">
                <span className="text-[#18181A]/60 uppercase">Estimated Delivery</span>
                <span className="text-[#18181A]">3-5 Business Days</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>Total Amount Paid</span>
                <span className="font-mono tabular-nums">{formatPrice(confirmedOrder?.total || 0, currency)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#18181A] text-white hover:bg-black text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
