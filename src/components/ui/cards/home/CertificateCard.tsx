"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CertificateCardProps {
  imageSrc: string;
  title: string;
}

export default function CertificateCard({
  imageSrc,
  title,
}: CertificateCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  return (
    <>
      {/* Certificate Card */}
      <div className="w-full max-w-sm">
        <div
          onClick={() => setIsOpen(true)}
          className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
        >
          {/* Image */}
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={600}
            className="w-full h-96 object-contain p-4"
            priority
          />

          {/* Overlay Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 text-center">
            <span className="text-gray-800 font-semibold text-lg sm:text-xl font-[Poppins]">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Stop click propagation */}
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white text-3xl font-bold hover:opacity-80"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Fullscreen Image */}
            <Image
              src={imageSrc}
              alt={title}
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
