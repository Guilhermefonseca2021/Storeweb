type CartUser = {
  products: [{}],
}
export interface UserProps {
  _id: String;
  name: String;
  email: String;
  image: String;
  createdAt: Date;
  updatedAt: Date;
  cart?: CartUser
}
