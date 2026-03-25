"use client";

import { useMemo, useState } from "react";
import { createMessage, generateMessage } from "../lib/api";

type MessageEditorProps = {
  companies: { id: number; name: string }[];
  onSaved?: () => void;
};

const templateDefs = [
  { key: "first", label: "Первое касание" },
  { key: "followup1", label: "Follow-up 1" },
  { key: "followup2", label: "Follow-up 2" },
  { key: "redirect", label: "Не ко мне" }
];

export function MessageEditor({ companies, onSaved }: MessageEditorProps) {
  const [company, setCompany] = useState(companies[0]?.name ?? "STONE");
  const [savingType, setSavingType] = useState("");
  const [statusText, setStatusText] = useState("");

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

  async function saveTemplate(type: string) {
    const selectedCompany = companies.find((c) => c.name === company);
    if (!selectedCompany) {
      setStatusText("Не выбрана компания");
      return;
    }
    setSavingType(type);
    setStatusText("");
    try {
      const generated = await generateMessage({ company, type });
      await createMessage({
        company_id: selectedCompany.id,
        type,
        content: generated.content,
        status: "draft"
      });
      setStatusText(`Сохранено: ${type}`);
      await onSaved?.();
    } catch (error) {
      setStatusText(error instanceof Error ? error.message : "Ошибка сохранения");
    } finally {
      setSavingType("");
    }
  }

  return (
    <div className="grid" style={{ gap: 12 }}>
      {companies.length === 0 ? (
        <p className="muted">Нет компаний. Сначала добавьте компанию на вкладке "Список компаний".</p>
      ) : null}
      <div className="toolbar">
        <label htmlFor="company">Компания:</label>
        <select id="company" value={company} onChange={(e) => setCompany(e.target.value)} disabled={companies.length === 0}>
          {companies.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {statusText ? <p className="muted">{statusText}</p> : null}

      {templateDefs.map((tpl) => (
        <article key={tpl.key} className="message-card">
          <h3 style={{ marginTop: 0 }}>{tpl.label}</h3>
          <p>{templates[tpl.key as keyof typeof templates]}</p>
          <div className="toolbar" style={{ marginBottom: 0 }}>
            <button onClick={() => copy(templates[tpl.key as keyof typeof templates])} disabled={companies.length === 0}>
              Копировать
            </button>
            <button onClick={() => saveTemplate(tpl.key)} disabled={savingType === tpl.key || companies.length === 0}>
              {savingType === tpl.key ? "Сохранение..." : "Сохранить в историю"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
