export type FormOrder = {
  name: string;
  address: string;
  phone: string;
};

export type Order = {
  _id: string;
  user: string;
  address: string;
  phone: string;
  name: string;
  payment: string;
  products: CartProduct[];
  status: string;
};

export type CartProduct = {
  product: {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    category: string;
  };
  quantity: number;
};
