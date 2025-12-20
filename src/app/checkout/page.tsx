"use client";

import { useCheckoutStore } from "@/store/checkout.store";

import CartItems from "@/components/cart/CartItems"
import DeliveryForm from "@/components/cart/DeliveryForm"
import PaymentForm from "@/components/cart/PaymentForm"
import ReviewOrder from "@/components/cart/ReviewOrder"
// import OrderConfirmed from "@/components/cart/OrderConfirmed"


export default function CartPage() {
  const step = useCheckoutStore((s) => s.step);

  return (
    <>
      {step === "cart" && <CartItems />}
      {step === "delivery" && <DeliveryForm />}
      {step === "payment" && <PaymentForm />}
      {step === "review" && <ReviewOrder />}
      {/* {step === "order-confirmed" && <OrderConfirmed />} */}
    </>
  );
}
