"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/radar", label: "Радар объектов" },
  { href: "/companies", label: "Список компаний" },
  { href: "/gip-map", label: "Карта ГИПов" },
  { href: "/messages", label: "Сообщения" }
];

export function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav className="tabs" aria-label="Основные вкладки">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} className={`tab-link ${active ? "active" : ""}`}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
