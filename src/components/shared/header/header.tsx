"use client";
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { useNavStore } from "@/store";
import Button from "@/components/ui/button/button";
import { useCartStore } from '@/store/useCartStore';
import NavLinkItem from "@/components/shared/navlink/navLinkItem";


// header component

export default function Header() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/#aboutSiddha", label: "About Siddha" },
    { href: "/products", label: "Products" },
    { href: "/#specialTreatments", label: "Special Treatments" },
    { href: "/#contact", label: "Contact" },
  ];
  
  const total = useCartStore(state => state.items.reduce((s, i) => s + i.quantity, 0));

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="md:max-w-[87.5rem] mx-auto px-[1.5rem] lg:px-[3rem]">
          <div className="flex items-center justify-between h-auto md:h-[4.6875rem] pt-4 pb-2 mx-auto">
            <div className="flex items-center gap-3 cursor-pointer">
              <Link href={"/"} className="flex items-center gap-3">
                <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Thiru Kailainaadhar Logo"
                    width={100}
                    height={100}
                    className="object-cover object-center"
                    priority
                  />
                </div>

                <div className="flex flex-col">
                  <div className="font-['Arima',sans-serif] text-[1.025rem] text-gray-800 leading-tight font-semibold">
                    Thiru Kailainaadhar
                  </div>
                  <div className="font-['Poppins',sans-serif] text-[#2e7d32] text-[.725rem] leading-tight font-medium">
                    Siddha Clinic
                  </div>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {nav.map((n) => (
                <NavLinkItem key={n.href} href={n.href} label={n.label} sm={false} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* --- MODIFIED SECTION: WRAPPED IN LINK --- */}
              <Link href="/cart">
                <button className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative group" aria-label="Shopping Cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart w-5 h-5 text-gray-700 group-hover:text-[#2e7d32] transition-colors" aria-hidden="true">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  {/* show badge with total quantity */}
                  {total > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#2e7d32] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {total}
                    </span>
                  )}
                </button>
              </Link>
              {/* --- END MODIFIED SECTION --- */}

              <div className="relative account-dropdown-container">
                <Link href="/login" aria-label="Login" className="px-[1.25rem] py-[0.5rem] rounded-lg bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] hover:shadow-lg transition-all inline-flex items-center">
                  <span className="text-white font-['Poppins',sans-serif] font-medium text-[0.9375rem]">Login</span>
                </Link>
              </div>

              <button className="lg:hidden w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ml-2" aria-label="Menu"
                onClick={() => { setMenuOpen(!menuOpen) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-5 h-5 text-gray-700" aria-hidden="true">
                  <path d="M4 5h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 19h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`${menuOpen ? "block" : "hidden"} lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]`}></div>

        <div className={`${menuOpen ? "block" : "hidden"} lg:hidden fixed top-0 right-0 bottom-0 w-[17.5rem] bg-white shadow-2xl z-[100]`}>
          <div className="flex items-center justify-between p-[1.25rem] border-b border-gray-100 pt-4 pb-2 h-24">
            <h3 className="font-['Poppins',sans-serif] font-semibold text-gray-800 text-lg">Menu</h3>

            <button className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => { setMenuOpen(!menuOpen) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-5 h-5 text-gray-600" aria-hidden="true">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <nav className="p-4 bg-green-50" onClick={() => { setMenuOpen(!menuOpen) }}>
            {nav.map((n) => (
              <NavLinkItem key={n.href} href={n.href} label={n.label} sm={true} />
            ))}
          </nav>
        </div>
      </header>

    </>
  );
}
