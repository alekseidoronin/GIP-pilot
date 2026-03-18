import { DashboardTabs } from "../../components/DashboardTabs";
import { DataTable } from "../../components/DataTable";
import { MessageEditor } from "../../components/MessageEditor";
import { Company, getCompanies, getMessages, Message } from "../../lib/api";

const demoCompanies: Company[] = [
  {
    id: 1,
    name: "STONE",
    city: "Москва",
    why_suitable: "",
    website: "",
    priority: "high",
    status: "new",
    touches: 0
  },
  {
    id: 2,
    name: "Галс-Девелопмент",
    city: "Москва/СПб",
    why_suitable: "",
    website: "",
    priority: "high",
    status: "new",
    touches: 0
  }
];

const demoMessages: Message[] = [
  {
    id: 1,
    company: "STONE",
    type: "first",
    content: "Здравствуйте! Есть идея по ускорению КР-блока для ваших проектов.",
    status: "draft"
  }
];

export default async function MessagesPage() {
  let companies = demoCompanies;
  let messages = demoMessages;

  try {
    companies = await getCompanies();
    messages = await getMessages();
  } catch (_err) {
    companies = demoCompanies;
    messages = demoMessages;
  }

  return (
    <main className="container">
      <h1>Сообщения</h1>
      <DashboardTabs />
      <section className="card grid grid-2">
        <MessageEditor companyNames={companies.map((c) => c.name)} />
      </section>
      <section className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>История отправок</h2>
        <DataTable
          columns={[
            { key: "company", label: "Компания" },
            { key: "type", label: "Тип" },
            { key: "content", label: "Сообщение" },
            { key: "status", label: "Статус" }
          ]}
          rows={messages as unknown as Record<string, unknown>[]}
        />
      </section>
    </main>
  );
}
