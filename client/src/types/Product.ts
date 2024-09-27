import { Category } from "./Category";

export interface Product {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  category: Category;
  show: boolean;
}

export interface ApiResPro {
  message: string;
  data: Product[];
}

export interface ApiResProDetail {
  message: string;
  data: Product;
}
