"use client";

import { useMemo, useState } from "react";

type MessageEditorProps = {
  companyNames: string[];
};

const templateDefs = [
  { key: "first", label: "Первое касание" },
  { key: "followup1", label: "Follow-up 1" },
  { key: "followup2", label: "Follow-up 2" },
  { key: "redirect", label: "Не ко мне" }
];

export function MessageEditor({ companyNames }: MessageEditorProps) {
  const [company, setCompany] = useState(companyNames[0] ?? "STONE");

  const templates = useMemo(
    () => ({
      first: `Здравствуйте! Мы проектируем раздел КР и видим потенциал сотрудничества с ${company}. Предлагаю короткий созвон на 15 минут.`,
      followup1: `Напоминаю о предложении по ${company}. Можем направить релевантные кейсы и KPI по срокам проектирования.`,
      followup2: `Если тема по ${company} актуальна, отправлю 1-страничный план входа в проект без лишних материалов.`,
      redirect: `Понял, спасибо! Подскажите, пожалуйста, кто в ${company} отвечает за выбор проектировщиков по КР?`
    }),
    [company]
  );

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="toolbar">
        <label htmlFor="company">Компания:</label>
        <select id="company" value={company} onChange={(e) => setCompany(e.target.value)}>
          {companyNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {templateDefs.map((tpl) => (
        <article key={tpl.key} className="message-card">
          <h3 style={{ marginTop: 0 }}>{tpl.label}</h3>
          <p>{templates[tpl.key as keyof typeof templates]}</p>
          <div className="toolbar" style={{ marginBottom: 0 }}>
            <button onClick={() => copy(templates[tpl.key as keyof typeof templates])}>Копировать</button>
          </div>
        </article>
      ))}
    </div>
  );
}
