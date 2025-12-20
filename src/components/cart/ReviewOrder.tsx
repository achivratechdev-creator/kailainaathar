"use client";

import { ArrowLeft, Truck, Shield, CreditCard, Package, CircleCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartItemsStore } from "@/store/cart-items.store";

export default function ReviewOrder() {
  const {
    delivery,
    paymentMethod,
    setStep,
  } = useCheckoutStore();

  const {
    items,
    clearCart,
  } = useCartItemsStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const savings = subtotal - total;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // here is where API call would go later
    // await createOrder({ delivery, paymentMethod, items })

    clearCart();
    setStep("order-confirmed");
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* BACK TO STORE */}
        <button
          onClick={() => setStep("cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-medium text-sm mb-6"
        >
          ← Back to Store
        </button>

        {/* PROGRESS */}
        <div className="mb-8 text-center text-sm font-medium text-[#2e7d32]">
          Delivery → Payment → Review
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* ITEMS */}
              <div className="bg-white border rounded-lg p-6">
                <h2 className="font-bold text-lg mb-4">
                  Review Your Order
                </h2>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border p-3 rounded-lg mb-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="font-medium text-[#2e7d32]">
                      ₹{item.quantity * item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* DELIVERY */}
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <p className="text-sm">{delivery.fullName}</p>
                <p className="text-sm">{delivery.phone}</p>
                <p className="text-sm">{delivery.address}</p>
                <p className="text-sm">Pincode: {delivery.pincode}</p>
              </div>

              {/* PAYMENT */}
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="text-sm capitalize">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="text-sm text-gray-600 hover:text-[#2e7d32]"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#256629]"
                >
                  Place Order – ₹{total}
                </button>
              </div>
            </div>

            {/* RIGHT SUMMARY */}
            <div>
                <div className="bg-white rounded-lg border p-6 sticky top-24">
                <h3 className="font-bold mb-5">Order Summary</h3>

                <div className="space-y-3 mb-5 text-sm">
                    <Row label={`Subtotal (${items.length} items)`} value={`₹${subtotal}`} />
                    <Row label="Savings" value={`-₹${savings}`} green />
                    <Row label="Delivery" value="FREE" green />
                    <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#2e7d32] text-lg">₹{total}</span>
                    </div>
                </div>

                <Info icon={<Shield />} text="100% Secure Payments" />
                <Info icon={<Truck />} text="Free Delivery" />
                <Info icon={<CircleCheck />} text="Easy Returns" />
                </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Step({ icon, label, active = false }: any) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-1.5 ${
          active
            ? "bg-[#2e7d32] text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>
      <span className={`text-xs ${active ? "text-[#2e7d32]" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-1.5">{label} *</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:border-[#2e7d32]"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm mb-1.5">{label} *</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg h-24 resize-none text-sm focus:border-[#2e7d32]"
      />
    </div>
  );
}

function Row({ label, value, green = false }: any) {
  return (
    <div className={`flex justify-between ${green ? "text-green-600" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Info({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
      <span className="text-[#2e7d32]">{icon}</span>
      {text}
    </div>
  );
}
