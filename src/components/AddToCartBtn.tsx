"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { AddToCartBtnProps, IProductType } from "../../interfaces/ProductType";
import { useRouter } from "next/navigation";
import { getOrCreateCartAndAddItem } from "@/lib/cartActions";

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (product: IProductType): Promise<void> => {
    try {
      setIsAdded(true);
      await getOrCreateCartAndAddItem(1, product.id);
      window.dispatchEvent(new Event("cart-updated"));
      router.refresh();
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setIsAdded(false);
    }
  };

  return (
    <Button
      className="h-9 shrink-0 px-3 text-sm"
      disabled={product.stock === 0 || isAdded}
      onClick={() => handleAddToCart(product)}
    >
      <ShoppingCart className="mr-1.5 size-4" />
      {product.stock === 0 ? "Sold out" : isAdded ? "Adding..." : "Add"}
    </Button>
  );
};

export default AddToCartBtn;
