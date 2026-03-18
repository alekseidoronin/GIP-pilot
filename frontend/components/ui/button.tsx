import { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        border: "1px solid #d1d5db",
        background: "#ffffff",
        borderRadius: 8,
        padding: "8px 12px",
        cursor: "pointer"
      }}
    />
  );
}
