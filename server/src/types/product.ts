export interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock?: number;
}
