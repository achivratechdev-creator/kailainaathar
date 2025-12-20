"use client";

import { ArrowLeft, Truck, Shield, CreditCard, Package, CircleCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartItemsStore } from "@/store/cart-items.store";

export default function PaymentForm() {
    const {
        paymentMethod,
        setPaymentMethod,
        setStep,
    } = useCheckoutStore();

    const { items } = useCartItemsStore();
    
    const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
    );

    const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
    );

    const savings = subtotal - total;

  return (
    <div className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Back to store */}
        <button
          type="button"
          onClick={() => setStep("cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-['Poppins',sans-serif] font-medium text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        {/* Progress */}
        <div className="mb-8">{/* progress UI unchanged */}</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("review");
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-lg mb-5">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {/* UPI */}
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="w-4 h-4 text-[#2e7d32]"
                    />
                    <span className="flex-1">UPI Payment</span>
                  </label>

                  {/* CARD */}
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 text-[#2e7d32]"
                    />
                    <span className="flex-1">
                      Credit / Debit Card
                    </span>
                  </label>

                  {/* COD */}
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer border-[#2e7d32] bg-green-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-[#2e7d32]"
                    />
                    <span className="flex-1">
                      Cash on Delivery
                    </span>
                  </label>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setStep("delivery")}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32]"
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium hover:bg-[#256629]"
                  >
                    Review Order
                  </button>
                </div>
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
