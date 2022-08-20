export interface Asset {
  id: number;
  filename: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  assets: Asset[];
}
