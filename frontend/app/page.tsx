import Link from "next/link";
import { DashboardTabs } from "../components/DashboardTabs";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Пилот ГИПов</h1>
      <p className="muted">Дашборд по поиску клиентов и коммуникации с ЛПР.</p>
      <DashboardTabs />
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Быстрый старт</h2>
        <p>Выберите раздел для работы:</p>
        <ul>
          <li>
            <Link href="/radar">Радар объектов</Link>
          </li>
          <li>
            <Link href="/companies">Список компаний</Link>
          </li>
          <li>
            <Link href="/gip-map">Карта ГИПов</Link>
          </li>
          <li>
            <Link href="/messages">Сообщения</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
