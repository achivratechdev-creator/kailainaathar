"use client";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export default function TextInput({
  type = "text",
  ...props
}: Props) {
  return (
    <input
      type={type}
      {...props}
      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 font-poppins placeholder-gray-400 outline-none"
    />
  );
}
