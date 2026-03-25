import { DashboardTabs } from "../../components/DashboardTabs";
import { DataTable } from "../../components/DataTable";
import { getRadar, RadarObject } from "../../lib/api";
import { formatDate } from "../../lib/utils";

const demoRadar: RadarObject[] = [
  {
    id: 1,
    object_name: "STONE Towers Phase 2",
    city: "Москва",
    stage: "Проектирование",
    companies: "STONE",
    link: "https://stone.ru",
    date: "2026-03-01",
    status: "new",
    priority: "high"
  }
];

export default async function RadarPage() {
  let rows = demoRadar;
  try {
    rows = await getRadar();
  } catch (_err) {
    rows = demoRadar;
  }

  const tableRows = rows.map((row) => ({
    object: row.object_name,
    city: row.city,
    stage: row.stage,
    companies: row.companies,
    link: row.link,
    date: formatDate(row.date),
    status: row.status,
    priority: row.priority
  }));

  return (
    <main className="container">
      <h1>Радар объектов</h1>
      <DashboardTabs />
      <section className="card">
        <div className="toolbar">
          <select defaultValue="">
            <option value="">Город</option>
            <option value="Москва">Москва</option>
            <option value="СПб">СПб</option>
          </select>
          <input type="date" aria-label="Дата от" />
          <input type="date" aria-label="Дата до" />
          <button>Найти</button>
        </div>

        <div className="toolbar">
          <button>Обновить радар</button>
          <button>Добавить повод</button>
          <button>Экспорт CSV</button>
          <button>Экспорт PDF</button>
        </div>

        <DataTable
          columns={[
            { key: "object", label: "Объект" },
            { key: "city", label: "Город" },
            { key: "stage", label: "Стадия" },
            { key: "companies", label: "Компании" },
            { key: "link", label: "Ссылка" },
            { key: "date", label: "Дата" },
            { key: "status", label: "Статус" },
            { key: "priority", label: "Приоритет" }
          ]}
          rows={tableRows}
        />
      </section>
    </main>
  );
}
