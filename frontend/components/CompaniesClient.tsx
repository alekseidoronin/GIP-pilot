"use client";

import { useMemo, useState } from "react";
import { AddCompanyButton } from "./AddCompanyButton";
import { DataTable } from "./DataTable";
import { Company, createCompany } from "../lib/api";

type CompaniesClientProps = {
  initialRows: Company[];
};

export function CompaniesClient({ initialRows }: CompaniesClientProps) {
  const [rows, setRows] = useState<Company[]>(initialRows);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [errorText, setErrorText] = useState("");

  const filteredRows = useMemo(
    () =>
      rows.filter((item) => {
        if (priorityFilter && item.priority !== priorityFilter) return false;
        if (statusFilter && item.status !== statusFilter) return false;
        return true;
      }),
    [rows, priorityFilter, statusFilter]
  );

  async function handleCreate(payload: {
    name: string;
    city?: string;
    website?: string;
    why_suitable?: string;
    priority?: string;
    status?: string;
  }) {
    setErrorText("");
    try {
      const created = (await createCompany(payload)) as Company;
      setRows((prev) => [created, ...prev]);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Не удалось добавить компанию");
      throw error;
    }
  }

  return (
    <section className="card">
      <div className="toolbar">
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">Приоритет</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Статус</option>
          <option value="new">new</option>
          <option value="active">active</option>
        </select>
        <button>Поиск</button>
        <AddCompanyButton onCreate={handleCreate} />
      </div>
      <div className="toolbar">
        <button>К ГИПам</button>
        <button>Статистика</button>
      </div>
      {errorText ? <p className="muted" style={{ color: "#b91c1c" }}>{errorText}</p> : null}
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
        rows={filteredRows as unknown as Record<string, unknown>[]}
      />
    </section>
  );
}
