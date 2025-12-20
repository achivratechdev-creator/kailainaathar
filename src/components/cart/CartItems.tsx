"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Shield,
  Truck,
  ShoppingCart,
} from "lucide-react";

import { useCartItemsStore } from "@/store/cart-items.store";
import { useCheckoutStore } from "@/store/checkout.store";

export default function CartItems() {
  const {
    items,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCartItemsStore();

  const setStep = useCheckoutStore((s) => s.setStep);

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
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      <main className="pt-12 pb-16">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-[#2e7d32] text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Store
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear Cart
              </button>
            )}
          </div>

          {/* Empty Cart */}
          {items.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add products to continue checkout.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-[#2e7d32] text-white rounded-lg font-medium"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart List */}
              <div className="lg:col-span-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border p-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-sm text-gray-900">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 mb-3">
                          {item.categoryLabel}
                        </p>

                        <div className="flex justify-between items-center">
                          {/* Quantity */}
                          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border">
                            <button
                              onClick={() =>
                                addToCart(item, -1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 bg-white rounded-md border disabled:opacity-50"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                addToCart(item, 1)
                              }
                              className="w-7 h-7 bg-white rounded-md border"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xs text-gray-400 line-through">
                              ₹{item.price * item.quantity}
                            </div>
                            <div className="text-lg font-bold text-[#2e7d32]">
                              ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <div className="bg-gray-50 rounded-lg border p-5 sticky top-24">
                  <h2 className="font-bold mb-5">Order Summary</h2>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-₹{savings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>

                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[#2e7d32] text-lg">
                        ₹{total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("delivery")}
                    className="w-full bg-[#2e7d32] text-white py-2.5 rounded-lg font-medium hover:bg-[#256629]"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="pt-5 border-t mt-5 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      Secure Payments
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      Free Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
