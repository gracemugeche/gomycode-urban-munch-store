export interface IOrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IOrder {
  _id: string;
  user: string;
  orderItems: IOrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    phone: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Stripe' ;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
