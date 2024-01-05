export interface Product {
  name: string;
  price: number;
  image: [""];
  size: [""];
  url: string;
  featured?: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
