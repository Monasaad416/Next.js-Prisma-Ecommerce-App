"use client"
import { Trash2Icon } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { ItemActionsProps } from '../../../types/CartItemInput'
import { useRouter } from 'next/navigation'
import { removeItemFromCart } from '@/lib/cartActions'

const RemoveItem = ({ item }: ItemActionsProps) => {
      const router = useRouter();
      const [isPending, startTransition] = useTransition();
    
      const handleRemoveItem = () => {
        startTransition(async () => {
          await removeItemFromCart(item);
          window.dispatchEvent(new Event("cart-updated"));
          router.refresh();
        });
      };

  return (
    <Button
        variant="destructive"
        size="icon"
        disabled={isPending}
        onClick={handleRemoveItem}
    >
         {isPending ? "Removing..." : <Trash2Icon className="h-6 w-6" />}
    </Button>
  )
}

export default RemoveItem