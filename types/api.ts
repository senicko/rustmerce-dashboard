export type ApiError = {
  message: string;
};

export type Asset = {
  id: number;
  filename: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  status: "Draft" | "Published";
  assets: Asset[];
};

export type Category = {
  id: number;
  name: string;
  parent_id: null | number;
  children: Category[];
};
