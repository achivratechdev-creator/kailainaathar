"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff, X } from "lucide-react";
import { Poppins, Arima } from "next/font/google";
import axios, { AxiosError } from "axios";

// 1. Font Configuration
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arima",
});

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const dismissToast = () => setToast(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    // Name: at least 6 chars
    if (!form.name || form.name.trim().length < 6) {
      newErrors.name = "Name must be at least 6 characters.";
    }

    // Email: basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone: digits (optionally starts with +), length 10-15
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (10-15 digits).";
    }

    // Password: min 8, upper, lower, number, special
    const pw = form.password;
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    if (!pw || pw.length < 8 || !(hasUpper && hasLower && hasNumber && hasSpecial)) {
      newErrors.password = "Password must be 8+ chars with upper, lower, number, and special.";
    }

    // Confirm match
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear per-field error on change
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // --- Actions ---
  const handleClose = () => {
    // Navigates back to the previous page in history
    router.back();
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/v1/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phonenumber: form.phone.trim(),
        password: form.password,
      });
      console.log(response.data.message);
      setToast({ type: "success", message: "Registered successfully! Redirecting to login…" });
      setTimeout(() => router.push("/login"), 800);
    } catch (error: unknown) {
      let msg = "Registration failed. Please try again.";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        msg = axiosError.response?.data?.message || axiosError.response?.data?.error || msg;
      }
      setToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    // FULL SCREEN WRAPPER: Fixed, no scroll, covers real header/footer
    <div className={`${poppins.variable} ${arima.variable} font-sans fixed inset-0 z-[9999] h-screen w-screen overflow-hidden bg-gray-50`}>
      
      {/* ====================================================================================
          1. BLURRED BACKGROUND LAYER 
      ==================================================================================== */}
      <div className="absolute inset-0 z-0 select-none bg-white">
        
        {/* Fake Header for Visual Purposes (Blurred) */}
        <div className="border-b border-gray-100 shadow-sm h-[75px] flex items-center filter blur-[5px] opacity-60">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-[2.75rem] h-[2.75rem] rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-1">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-2 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="hidden lg:flex gap-8">
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
          </div>
        </div>

        {/* Fake Body Content (Blurred) */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 filter blur-[5px] opacity-60">
            <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-64 bg-gray-100 rounded-xl border border-gray-200"></div>
                ))}
            </div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      </div>

      {/* ====================================================================================
          2. FIXED SIGNUP CARD
          Centered vertically and horizontally
      ==================================================================================== */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
        
        <div 
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden grid grid-cols-1 md:grid-cols-5 animate-scale-in"
          style={{ maxHeight: '650px' }} 
        >
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* LEFT SIDE: Image Section (40% width) */}
          <div className="relative md:col-span-2 flex flex-col justify-center items-center overflow-hidden min-h-[120px] md:min-h-full bg-gradient-to-br from-[#2e7d32] to-[#66bb6a]">
            {/* Same image logic as login */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1589556165541-4254aa9cfb39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWRkaGElMjBtZWRpY2luZSUyMHByZXBhcmF0aW9uJTIwdHVybWVyaWN8ZW58MXx8fHwxNzYzOTcyMzcxfDA&ixlib=rb-4.1.0&q=80&w=1080")',
              }}
            />
          </div>

          {/* RIGHT SIDE: Form Section (60% width) */}
          <div className="md:col-span-3 px-6 py-6 md:px-6 md:py-6 overflow-y-auto bg-white scrollbar-hide flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              
              <div className="mb-4">
                <h3 className="text-gray-800 font-poppins text-xl mb-1 font-semibold">
                  Create Account
                </h3>
                <p className="text-gray-600 font-poppins font-light text-xs">
                  Sign up to start your wellness journey
                </p>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-3">
                {/* 1. Full Name */}
                <div className="space-y-1">
                  <label className="block text-gray-700 font-poppins text-xs">Full Name *</label>
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 pl-10 pr-3 border-2 rounded-lg font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all placeholder:text-gray-400 ${errors.name ? "border-red-300" : "border-gray-200"}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 font-poppins">{errors.name}</p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1">
                  <label className="block text-gray-700 font-poppins text-xs">Email Address *</label>
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 pl-10 pr-3 border-2 rounded-lg font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all placeholder:text-gray-400 ${errors.email ? "border-red-300" : "border-gray-200"}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 font-poppins">{errors.email}</p>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div className="space-y-1">
                  <label className="block text-gray-700 font-poppins text-xs">Phone Number *</label>
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 pl-10 pr-3 border-2 rounded-lg font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all placeholder:text-gray-400 ${errors.phone ? "border-red-300" : "border-gray-200"}`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 font-poppins">{errors.phone}</p>
                  )}
                </div>

                {/* 4. Password */}
                <div className="space-y-1">
                  <label className="block text-gray-700 font-poppins text-xs">Password *</label>
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 pl-10 pr-10 border-2 rounded-lg font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all placeholder:text-gray-400 ${errors.password ? "border-red-300" : "border-gray-200"}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-600 font-poppins">{errors.password}</p>
                  )}
                </div>

                {/* 5. Confirm Password */}
                <div className="space-y-1">
                  <label className="block text-gray-700 font-poppins text-xs">Confirm Password *</label>
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 pl-10 pr-3 border-2 rounded-lg font-poppins text-sm text-gray-700 focus:outline-none focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/10 transition-all placeholder:text-gray-400 ${errors.confirmPassword ? "border-red-300" : "border-gray-200"}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600 font-poppins">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] text-white py-2.5 rounded-lg font-poppins font-medium hover:shadow-xl hover:shadow-[#2e7d32]/20 transition-all duration-300 active:scale-[0.98] mt-3 cursor-pointer ${loading ? "opacity-70" : ""}`}
                >
                  {loading ? "Creating Account…" : "Create Account"}
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 font-poppins font-light">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button type="button" className="flex items-center justify-center gap-2 py-2 border-2 border-gray-200 rounded-lg font-poppins font-medium text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-2 border-2 border-gray-200 rounded-lg font-poppins font-medium text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                    <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    Facebook
                  </button>
                </div>

                <div className="text-center pb-2">
                  <p className="text-gray-600 font-poppins text-xs font-light">
                    Already have an account?{" "}
                    <Link 
                      href="/login" 
                      replace 
                      className="text-[#2e7d32] font-medium hover:underline cursor-pointer"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Toast / Popup messages */}
        {toast && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[10000]">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg border ${toast.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <span className={`text-sm font-poppins ${toast.type === "success" ? "text-green-700" : "text-red-700"}`}>
                {toast.message}
              </span>
              <button onClick={dismissToast} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
    
  );
}