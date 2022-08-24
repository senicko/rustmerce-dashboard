export type Asset = {
  id: number;
  filename: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  assets: Asset[];
};

export type ProductInsert = {
  name: string;
  price: number;
};
