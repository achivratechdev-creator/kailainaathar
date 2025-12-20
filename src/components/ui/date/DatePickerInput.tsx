"use client";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function DatePickerInput({ value, onChange }: Props) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins"
    />
  );
}
