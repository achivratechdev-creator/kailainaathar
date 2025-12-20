"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCartStore, useProductStore } from "@/store"

export default function ItemPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const { product, loading, fetchProductById } = useProductStore()
  const { addToCart } = useCartStore()

  const [qty, setQty] = useState(1)

  useEffect(() => {
    fetchProductById(id)
  }, [id, fetchProductById])

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-poppins text-gray-500">Loading product…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-16">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-[#2e7d32]"
        >
          ← Back to Store
        </button>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Image */}
          <div className="sticky top-24">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg border"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold font-poppins mb-2">
              {product.name}
            </h1>

            <p className="text-sm text-gray-600 mb-3">
              ⭐ {product.rating} ({product.reviews}+ reviews)
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#2e7d32]">
                ₹{product.price}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.mrp}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 border rounded">
                −
              </button>
              <span className="font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 border rounded">
                +
              </button>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 border-2 border-[#2e7d32] text-[#2e7d32] py-3 rounded-lg font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product, qty)
                  router.push("/checkout")
                }}
                className="flex-1 bg-[#2e7d32] text-white py-3 rounded-lg font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* Benefits */}
            <h3 className="font-semibold mb-3">Benefits</h3>
            <ul className="space-y-2 mb-6">
              {product.benefits.map((b) => (
                <li key={b} className="text-sm text-gray-700">✔ {b}</li>
              ))}
            </ul>

            {/* Ingredients */}
            <h3 className="font-semibold mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1 border rounded-full text-sm text-[#2e7d32]"
                >
                  {i}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
