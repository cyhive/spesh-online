export interface ProductColor {
  name: string;
  hex: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Outerwear' | 'Tailoring' | 'Knitwear' | 'Silk & Shirts' | 'Trousers';
  price: number;
  originalPrice?: number;
  origin: string;
  fabric: string;
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  primaryImage: string;
  detailImages?: string[];
  description: string;
  details: string[];
  care: string[];
  fit: string;
  isNewArrival?: boolean;
  isLimited?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL';
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'cod' | 'apple_pay';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}
