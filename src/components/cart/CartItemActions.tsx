'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ItemActionsProps } from '../../../types/CartItemInput';
import { Button } from '../ui/button';
import { dercreaseItemQty, increaseItemQty } from '@/lib/cartActions';


export const CartItemActions = ({ item }: ItemActionsProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleIncrease = () => {
    startTransition(async () => {
      await increaseItemQty (item);
      router.refresh();
    });
  };

  const handleDecrease = () => {
    startTransition(async () => {
      await dercreaseItemQty(item);
      router.refresh();
    });
  };

  return (
    <>
      <Button
        onClick={handleDecrease}
        disabled={isPending}
      >
        -
      </Button>

      <span>{item.quantity}</span>

      <Button
        onClick={handleIncrease}
        disabled={isPending}
      >
        +
      </Button>
    </>
  );
};