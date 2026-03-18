import { DashboardTabs } from "../../components/DashboardTabs";
import { DataTable } from "../../components/DataTable";
import { Company, getCompanies } from "../../lib/api";

const demoCompanies: Company[] = [
  {
    id: 1,
    name: "STONE",
    city: "Москва",
    why_suitable: "Офисный рынок, STONE Towers",
    website: "https://stone.ru",
    priority: "high",
    status: "new",
    touches: 0
  },
  {
    id: 2,
    name: "MR Group",
    city: "Москва",
    why_suitable: "Топ-девелопер БЦ",
    website: "https://mr-group.ru",
    priority: "high",
    status: "new",
    touches: 0
  }
];

export default async function CompaniesPage() {
  let rows = demoCompanies;
  try {
    rows = await getCompanies();
  } catch (_err) {
    rows = demoCompanies;
  }

  return (
    <main className="container">
      <h1>Список компаний</h1>
      <DashboardTabs />
      <section className="card">
        <div className="toolbar">
          <select defaultValue="">
            <option value="">Приоритет</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
          </select>
          <select defaultValue="">
            <option value="">Статус</option>
            <option value="new">new</option>
            <option value="active">active</option>
          </select>
          <button>Поиск</button>
        </div>
        <div className="toolbar">
          <button>Добавить</button>
          <button>К ГИПам</button>
          <button>Статистика</button>
        </div>
        <DataTable
          columns={[
            { key: "name", label: "Компания" },
            { key: "city", label: "Город" },
            { key: "why_suitable", label: "Почему подходит" },
            { key: "website", label: "Сайт" },
            { key: "priority", label: "Приоритет" },
            { key: "status", label: "Статус" },
            { key: "touches", label: "Касаний" }
          ]}
          rows={rows as unknown as Record<string, unknown>[]}
        />
      </section>
    </main>
  );
}
