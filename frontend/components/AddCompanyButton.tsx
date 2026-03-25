"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

type AddCompanyPayload = {
  name: string;
  city?: string;
  website?: string;
  why_suitable?: string;
  priority?: string;
  status?: string;
};

type AddCompanyButtonProps = {
  onCreate: (payload: AddCompanyPayload) => Promise<void>;
};

export function AddCompanyButton({ onCreate }: AddCompanyButtonProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function addCompany(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: AddCompanyPayload = {
      name: String(formData.get("name") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      why_suitable: String(formData.get("why_suitable") || "").trim(),
      priority: String(formData.get("priority") || "medium"),
      status: String(formData.get("status") || "new")
    };

    if (!payload.name) {
      setError("Укажите название компании");
      return;
    }

    setError("");
    setSaving(true);
    try {
      await onCreate(payload);
      setOpen(false);
      (event.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось добавить компанию");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Button icon="plus" onClick={() => setOpen(true)}>
        Добавить
      </Button>

      {open ? (
        <div className="card" style={{ width: "100%", marginTop: 8 }}>
          <h3 style={{ marginTop: 0 }}>Новая компания</h3>
          <form onSubmit={addCompany} className="grid">
            <input name="name" placeholder="Название*" required />
            <input name="city" placeholder="Город" />
            <input name="website" placeholder="Сайт" />
            <input name="why_suitable" placeholder="Почему подходит" />
            <div className="toolbar">
              <select name="priority" defaultValue="medium">
                <option value="high">high</option>
                <option value="medium">medium</option>
              </select>
              <select name="status" defaultValue="new">
                <option value="new">new</option>
                <option value="active">active</option>
              </select>
            </div>

            {error ? <p className="muted" style={{ color: "#b91c1c" }}>{error}</p> : null}

            <div className="toolbar" style={{ marginBottom: 0 }}>
              <button type="submit" disabled={saving}>
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
              <button type="button" onClick={() => setOpen(false)} disabled={saving}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
