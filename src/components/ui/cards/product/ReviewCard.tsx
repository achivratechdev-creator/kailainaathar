// components/ReviewCard.tsx
import { Review } from "@/types/product"
import { formatTimeAgo } from "@/utils/helpers"

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-gray-50">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {review.name.charAt(0)}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm">{review.name}</h4>
            {review.verified && (
              <span className="text-green-700 text-[10px] bg-green-100 px-2 py-0.5 rounded-full">
                Verified Purchase
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < review.rating
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(review.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">{review.comment}</p>

      {review.media?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {review.media.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={review.name}
              className="rounded-lg object-cover aspect-square"
            />
          ))}
        </div>
      ) : null}

      <button className="flex items-center gap-2 text-xs border px-4 py-2 rounded-lg bg-white hover:bg-gray-50">
        👍 Helpful ({review.helpfulCount})
      </button>
    </div>
  )
}
