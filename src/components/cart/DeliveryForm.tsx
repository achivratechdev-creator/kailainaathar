"use client";

import { ArrowLeft, Truck, Shield, CreditCard, Package, CircleCheck } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartItemsStore } from "@/store/cart-items.store";

export default function DeliveryForm() {
  const { delivery, setDelivery, setStep } = useCheckoutStore();
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

  const handleContinue = () => {
    if (
      !delivery.fullName ||
      !delivery.phone ||
      !delivery.address ||
      !delivery.pincode
    ) {
      alert("Please fill all delivery details");
      return;
    }

    setStep("payment");
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-16 font-['Poppins',sans-serif]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Back */}
        <button
          onClick={() => setStep("cart")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] font-medium text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        {/* Stepper */}
        <div className="flex justify-center gap-6 mb-10">
          <Step icon={<Package />} label="Delivery" active />
          <Step icon={<CreditCard />} label="Payment" />
          <Step icon={<CircleCheck />} label="Review" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2e7d32]" />
                Delivery Information
              </h2>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={delivery.fullName}
                  onChange={(v: string) => setDelivery({ fullName: v })}
                />

                <Input
                  label="Mobile Number"
                  value={delivery.phone}
                  onChange={(v: string) => setDelivery({ phone: v })}
                />

                <Textarea
                  label="Complete Address"
                  value={delivery.address}
                  onChange={(v: string) => setDelivery({ address: v })}
                />

                <Input
                  label="Pincode"
                  value={delivery.pincode}
                  onChange={(v: string) => setDelivery({ pincode: v })}
                />
              </div>

              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium hover:bg-[#256629]"
              >
                Continue to Payment
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
