export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface ApiResCate {
  message: string;
  data: Category[];
}
