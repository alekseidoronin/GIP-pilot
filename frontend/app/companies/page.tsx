import { DashboardTabs } from "../../components/DashboardTabs";
import { CompaniesClient } from "../../components/CompaniesClient";
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
      <CompaniesClient initialRows={rows} />
    </main>
  );
}
