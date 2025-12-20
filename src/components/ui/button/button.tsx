"use client";
import React, { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  text?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  paddingX?: string;
  paddingY?: string;
  rounded?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  disabled?: boolean;
  icon?: ReactNode;
  borderColor?: string;
  boxShadow?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  bgColor = "#2E7D32",
  textColor = "#FFFFFF",
  width = "auto",       // 81px → 5.0625rem
  height = "2.5rem",         // 40px → 2.5rem
  paddingX = "1.25rem",      // 20px → 1.25rem
  paddingY = "0.53125rem",   // 8.5px → 0.53125rem
  rounded = "0.625rem",      // 10px → 0.625rem
  fontSize = "0.9375rem",    // 15px → 0.9375rem
  fontWeight = 500,
  lineHeight = "1.375rem",   // 22px → 1.375rem
  disabled = false,
  icon,
  children,
  borderColor,
  boxShadow,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="lg:flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap m-2"
      style={{
        width,
        height,
        padding: `${paddingY} ${paddingX}`,
        borderRadius: rounded,
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: "'Poppins', sans-serif",
        fontSize,
        fontWeight,
        lineHeight,
        cursor: disabled ? "not-allowed" : "pointer",
        border: borderColor ? `1px solid ${borderColor}` : "none",
        boxShadow,
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
