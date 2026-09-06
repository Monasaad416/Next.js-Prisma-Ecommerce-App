import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getCart } from "@/lib/cart";
import { Separator } from "../ui/separator";
import CheckoutForm from "./CheckoutForm";

const OrderSummary = async () => {
  const cart = (await getCart()) || null;

  return (
    <Card className="sticky top-24 border-border/80 bg-card/90 shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Items</span>
          <span className="font-medium text-foreground">{cart?.size ?? 0}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            ${(cart?.subTotal ?? 0).toFixed(2)}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>${(cart?.subTotal ?? 0).toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <CheckoutForm />
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
