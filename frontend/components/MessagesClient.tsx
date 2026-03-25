"use client";

import { useState } from "react";
import { DataTable } from "./DataTable";
import { MessageEditor } from "./MessageEditor";
import { Message, getMessages } from "../lib/api";

type MessagesClientProps = {
  initialCompanies: { id: number; name: string }[];
  initialMessages: Message[];
};

export function MessagesClient({ initialCompanies, initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  async function refreshHistory() {
    const latest = await getMessages();
    setMessages(latest);
  }

  return (
    <>
      <section className="card grid grid-2">
        <MessageEditor companies={initialCompanies} onSaved={refreshHistory} />
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
    </>
  );
}
