
export interface Product {
  id?: string;
  product_name: string;
  product_image: string;
  product_price: number;
  description: string;
  Id_category: number;
  quantity: number;
  status: 'available' | 'out of stock';
  rating: number;
  review: string;
  color_option: string[];
}

export interface ProductState {
  data: Product[];
  loading: boolean;
  parenProduct:Product[];
  childProduct:Product[];
  error: string | null;
}
