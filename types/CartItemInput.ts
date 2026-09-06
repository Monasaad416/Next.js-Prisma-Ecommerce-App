export type CartItemInput = {
  id: string;
  productId: string;
  quantity: number;
  cartId?: string;
};

export type ItemActionsProps = {
  item: CartItemInput;
  cartId?: string;
};