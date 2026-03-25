import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пилот ГИПов",
  description: "Dashboard для поиска и коммуникации с ГИПами",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/favicon-gp.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
