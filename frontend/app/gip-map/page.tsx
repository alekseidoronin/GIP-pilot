import { DashboardTabs } from "../../components/DashboardTabs";
import { DataTable } from "../../components/DataTable";
import { getGipMap, GipRoute } from "../../lib/api";

const demoMap: GipRoute[] = [
  {
    id: 1,
    company: "STONE",
    lpr_role: "Директор по проектированию",
    entry_route: "Секретарь -> офис ГИПа -> встреча 15 минут",
    redirect_phrase: "Подскажите, кто ведет выбор КР-подрядчиков?",
    status: "pending"
  }
];

export default async function GipMapPage() {
  let rows = demoMap;
  try {
    rows = await getGipMap();
  } catch (_err) {
    rows = demoMap;
  }

  return (
    <main className="container">
      <h1>Карта ГИПов</h1>
      <DashboardTabs />
      <section className="card">
        <div className="toolbar">
          <select>
            <option>Выберите компанию</option>
            <option>STONE</option>
            <option>MR Group</option>
          </select>
          <button>Найти</button>
        </div>
        <div className="toolbar">
          <button>Генерировать карту</button>
          <button>Копировать маршрут</button>
          <button>Сообщение</button>
        </div>
        <DataTable
          columns={[
            { key: "company", label: "Компания" },
            { key: "lpr_role", label: "ЛПР (роль)" },
            { key: "entry_route", label: "Маршрут входа" },
            { key: "redirect_phrase", label: "Фраза" },
            { key: "status", label: "Статус" }
          ]}
          rows={rows as unknown as Record<string, unknown>[]}
        />
      </section>
    </main>
  );
}
