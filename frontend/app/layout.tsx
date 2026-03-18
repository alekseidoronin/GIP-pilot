import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пилот ГИПов",
  description: "Dashboard для поиска и коммуникации с ГИПами",
  icons: {
    icon: [{ url: "/favicon-gip-v3.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-gip-v3.svg",
    apple: "/favicon-gip-v3.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
