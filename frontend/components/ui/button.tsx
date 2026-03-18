import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: "plus";
};

export function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        border: "1px solid #d1d5db",
        background: "#ffffff",
        borderRadius: 8,
        padding: "8px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer"
      }}
    >
      {icon === "plus" ? <span aria-hidden="true">➕</span> : null}
      {children}
    </button>
  );
}
