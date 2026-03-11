export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'incense' | 'oils' | 'cards' | 'carpets';
}

export interface Order {
  id?: number;
  created_at?: string;
  name: string;
  number: string;
  adres: string;
  count: string;
  type: string;
  delivery_date?: string;
}

export interface VisitorAnalytics {
  id?: string;
  created_at?: string;
  country?: string;
  city?: string;
  section_viewed: string;
  ip_address?: string;
  user_agent?: string;
  session_duration?: number;
}
