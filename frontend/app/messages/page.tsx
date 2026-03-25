import { DashboardTabs } from "../../components/DashboardTabs";
import { MessagesClient } from "../../components/MessagesClient";
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
      <MessagesClient initialCompanies={companies} initialMessages={messages} />
    </main>
  );
}
