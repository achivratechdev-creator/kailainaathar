"use client";

import Link from "next/link";
import { useNavStore } from "@/store/nav.store";

interface Props {
  href: string;
  label: string;
  sm: boolean;
}

export default function NavLinkItem({ href, label, sm }: Props) {
  const { activeLink, setActiveLink } = useNavStore();

  const isActive = activeLink === href;

  const className = sm ? `flex w-full text-left px-4 py-3.5 rounded-lg font-['Poppins',sans-serif] text-[15px] transition-colors 
    ${isActive ? "bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white font-medium" : "text-gray-700 hover:bg-gray-50 font-normal"}
  ` : `
    py-2 font-['Poppins',sans-serif] text-[15px] transition-colors 
    ${isActive ? "text-[#2e7d32]" : "text-gray-700 hover:text-[#2e7d32]"}
  `;

  const handleClick = (e: React.MouseEvent) => {
    setActiveLink(href);

    // smooth-scroll for same-page anchors
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {label}
    </Link>
  );
}
