"use client";

import { create } from "zustand";

/* =====================
   ZUSTAND STORE
===================== */
type Step = "delivery" | "payment" | "review";

type PaymentMethod = "upi" | "card" | "cod";

interface CheckoutState {
    step: Step;
    fullName: string;
    mobile: string;
    address: string;
    pincode: string;
    payment: PaymentMethod;
    setStep: (step: Step) => void;
    setField: (key: keyof CheckoutState, value: any) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    step: "delivery",
    fullName: "",
    mobile: "",
    address: "",
    pincode: "",
    payment: "cod",
    setStep: (step) => set({ step }),
    setField: (key, value) => set({ [key]: value } as any),
}));

/* =====================
   PAGE
===================== */
export default function CheckoutPage() {
    const {
        step,
        fullName,
        mobile,
        address,
        pincode,
        payment,
        setStep,
        setField,
    } = useCheckoutStore();

    const canContinueDelivery = fullName && mobile && address && pincode;

    return (
        <div className="min-h-screen bg-white pt-20 pb-16">
            <div className="max-w-[1100px] mx-auto px-6">
                {/* STEPS */}
                <div className="mb-10 flex justify-center gap-10 text-sm font-medium">
                    <span className={step === "delivery" ? "text-green-700" : "text-gray-400"}>Delivery</span>
                    <span className={step === "payment" ? "text-green-700" : "text-gray-400"}>Payment</span>
                    <span className={step === "review" ? "text-green-700" : "text-gray-400"}>Review</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT */}
                    <div className="lg:col-span-2">
                        {/* DELIVERY */}
                        {step === "delivery" && (
                            <div className="bg-white rounded-lg border p-6 space-y-4">
                                <h2 className="font-bold text-lg">Delivery Information</h2>
                                <input
                                    placeholder="Full Name"
                                    className="w-full border px-4 py-2.5 rounded"
                                    value={fullName}
                                    onChange={(e) => setField("fullName", e.target.value)}
                                />
                                <input
                                    placeholder="Mobile Number"
                                    className="w-full border px-4 py-2.5 rounded"
                                    value={mobile}
                                    onChange={(e) => setField("mobile", e.target.value)}
                                />
                                <textarea
                                    placeholder="Complete Address"
                                    className="w-full border px-4 py-2.5 rounded h-24"
                                    value={address}
                                    onChange={(e) => setField("address", e.target.value)}
                                />
                                <input
                                    placeholder="Pincode"
                                    className="w-full border px-4 py-2.5 rounded"
                                    value={pincode}
                                    onChange={(e) => setField("pincode", e.target.value)}
                                />
                                <button
                                    disabled={!canContinueDelivery}
                                    onClick={() => setStep("payment")}
                                    className="w-full bg-green-700 disabled:opacity-40 text-white py-2.5 rounded"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* PAYMENT */}
                        {step === "payment" && (
                            <div className="bg-white rounded-lg border p-6 space-y-4">
                                <h2 className="font-bold text-lg">Payment Method</h2>

                                {["upi", "card", "cod"].map((m) => (
                                    <label
                                        key={m}
                                        className={`flex items-center gap-3 p-4 border rounded cursor-pointer ${payment === m ? "border-green-700 bg-green-50" : ""
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            checked={payment === m}
                                            onChange={() => setField("payment", m)}
                                        />
                                        <span className="capitalize">{m}</span>
                                    </label>
                                ))}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep("delivery")}
                                        className="text-sm text-gray-600"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep("review")}
                                        className="flex-1 bg-green-700 text-white py-2.5 rounded"
                                    >
                                        Review Order
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* REVIEW */}
                        {step === "review" && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                                <h2 className="text-gray-900 font-['Poppins',sans-serif] font-bold text-lg flex items-center gap-2">
                                    Review Your Order
                                </h2>

                                {/* ITEMS – replace later with cart store */}
                                <div className="space-y-3">
                                    {[
                                        { name: "Neelibringadi Kera Thailam", qty: 4, price: 450 },
                                        { name: "Triphala Choornam", qty: 1, price: 180 },
                                        { name: "Sukku Kaapi Powder", qty: 3, price: 220 },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3 p-3 border rounded-lg">
                                            <div className="w-16 h-16 bg-gray-100 rounded" />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    Qty: {item.qty} × ₹{item.price}
                                                </p>
                                            </div>
                                            <span className="font-medium text-[#2e7d32] text-sm">
                                                ₹{item.qty * item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* DELIVERY */}
                                <div className="border-t pt-5">
                                    <h3 className="text-sm font-medium mb-2">Delivery Address</h3>
                                    <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                                        <p className="font-medium">{fullName}</p>
                                        <p>{mobile}</p>
                                        <p>{address}</p>
                                        <p>Pincode: {pincode}</p>
                                    </div>
                                </div>

                                {/* PAYMENT */}
                                <div className="border-t pt-5">
                                    <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                                    <div className="bg-gray-50 p-3 rounded-lg border text-sm font-medium">
                                        {payment === "cod" ? "Cash on Delivery" : payment.toUpperCase()}
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setStep("payment")}
                                        className="flex items-center gap-2 text-gray-600 text-sm"
                                    >
                                        Back
                                    </button>

                                    <button
                                        onClick={() => alert("Order placed")}
                                        className="flex-1 bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#256629]"
                                    >
                                        Place Order – ₹2640
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-24">
                            <h3 className="font-bold mb-4">Order Summary</h3>
                            <div className="flex justify-between text-sm"><span>Total</span><span>₹1800</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
