import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
    return(
        <>
        <footer className="border-box bg-[#1E2939] border-b-[6px] md:border-b-[10px] items-center justify-center gap-4">
            <div className="py-4 lg:py-10 px-2 md:px-6 flex flex-col items-center">

                <div className="flex items-center justify-center gap-2 py-2">  
                    {/* Icon */}
                    <Image
                        src="/images/logo.png"
                        alt="Leaf Icon"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    {/* Branding */}
                    <div className="font-arima text-[#7BF1A8] text-[1.125rem] leading-[28px] text-center">
                        Nattrunaiyavadhu Namasivayave
                    </div>
                </div>

                {/* Info Section: Each item on separate line */}
                <div className="flex flex-col items-center gap-1">
                    <div className="font-poppins text-[#99A1AF] text-[14px] leading-[20px] text-center">
                    © 2025 Thiru Kailainaadhar Siddha Clinic. All Rights Reserved.
                    </div>
                    <div className="font-poppins text-[#6A7282] text-[12px] leading-[16px] text-center">
                    Govt. Reg. No: C.Ε. 36314
                    </div>
                    <div className="font-poppins text-[#6A7282] text-[12px] leading-[16px] text-center">
                    <a href="#" className={
                        // "hover:text-[#7BF1A8]"
                        " transition-colors"}>
                        Privacy Policy
                    </a>
                    </div>
                    <div className="font-poppins text-[#6A7282] text-[12px] leading-[16px] text-center">
                    <a href="#" className={
                        // "hover:text-[#7BF1A8]"
                        " transition-colors"}>
                        Terms And Conditions
                    </a>
                    </div>
                    <div className="font-poppins text-[#6A7282] text-[12px] leading-[16px] text-center text-gray-400 cursor-pointer">
                    <Link href="/admin/" className="hover:text-green-400 transition-colors">
                        Admin Login
                    </Link>
                    </div>
                </div>
            </div>
        </footer>

        </>
    );
}