type DataTableProps<T extends Record<string, unknown>> = {
  columns: { key: keyof T; label: string }[];
  rows: T[];
  emptyLabel?: string;
};

export function DataTable<T extends Record<string, unknown>>({ columns, rows, emptyLabel = "Нет данных" }: DataTableProps<T>) {
  if (!rows.length) {
    return <p className="muted">{emptyLabel}</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((c) => (
                <td key={String(c.key)}>{String(row[c.key] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
