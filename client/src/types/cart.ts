export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  _id?: string;
  user: string; 
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
