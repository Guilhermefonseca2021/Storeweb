export interface UserProps {
  _id: String;
  name: String;
  email: String;
  image: String;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  cart?: { product: []; quantity: number };
}
