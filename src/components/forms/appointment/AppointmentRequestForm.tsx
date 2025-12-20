"use client";

import { useState } from "react";
import { useAppointmentStore } from "@/store";

// -------- Component --------
export default function AppointmentRequestForm() {
  const { name, phone, date, setField, reset } = useAppointmentStore();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date) {
      alert("All fields required");
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Appointment requested successfully");
      reset();
    } catch (err) {
      alert("Network error");
    }
  };


  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Name */}
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins placeholder-gray-400 outline-none"
        />

        {/* Phone */}
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="Your Phone Number"
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins placeholder-gray-400 outline-none"
        />

        {/* Date Picker */}
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full text-left px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins bg-transparent"
          >
            {date ? date : "Select appointment date"}
          </button>

          {open && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md p-2 shadow">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setField("date", e.target.value);
                  setOpen(false);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white font-medium py-3 rounded-md shadow hover:bg-green-800 transition-colors"
        >
          Request Appointment
        </button>
      </form>

      <div className="absolute inset-0 border-t-4 border-green-700 rounded-lg shadow-xl pointer-events-none" />
    </div>
  );
}
