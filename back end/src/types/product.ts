export interface Product {
  name: string;
  price: number;
  image: [""];
  size: [""];
  featured?: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
