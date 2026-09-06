import { OrderWithItemsAndProducts } from "@/lib/stripe"

export type CheckoutResponse = {
    fullOrder: OrderWithItemsAndProducts,
    sessionUrl:string
}