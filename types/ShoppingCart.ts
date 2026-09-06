import { SerializedCart } from "@/lib/mappers/cartMapper";

export type ShoppingCart = SerializedCart & {
  size: number;
  subTotal: number;
};