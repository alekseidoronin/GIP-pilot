const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type Company = {
  id: number;
  name: string;
  city: string | null;
  why_suitable: string | null;
  website: string | null;
  priority: string;
  status: string;
  touches: number;
};

export type RadarObject = {
  id: number;
  object_name: string;
  city: string | null;
  stage: string | null;
  companies: string | null;
  link: string | null;
  date: string | null;
  status: string;
  priority: string;
};

export type GipRoute = {
  id: number;
  company: string;
  lpr_role: string | null;
  entry_route: string | null;
  redirect_phrase: string | null;
  status: string;
};

export type Message = {
  id: number;
  company: string;
  type: string;
  content: string;
  status: string;
};

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API request failed (${res.status}): ${path}`);
  }
  return (await res.json()) as T;
}

export async function getCompanies(): Promise<Company[]> {
  return request<Company[]>("/api/companies");
}

export async function getRadar(): Promise<RadarObject[]> {
  return request<RadarObject[]>("/api/radar");
}

export async function getGipMap(): Promise<GipRoute[]> {
  return request<GipRoute[]>("/api/gip-map");
}

export async function getMessages(): Promise<Message[]> {
  return request<Message[]>("/api/messages");
}

export async function createCompany(payload: {
  name: string;
  city?: string;
  website?: string;
  why_suitable?: string;
  priority?: string;
  status?: string;
}) {
  const res = await fetch(`${API_URL}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Create company failed (${res.status}): ${errText}`);
  }
  return res.json();
}

export async function generateMessage(payload: { company: string; type: string }) {
  const res = await fetch(`${API_URL}/api/messages/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Generate message failed (${res.status})`);
  return res.json() as Promise<{ company: string; type: string; content: string }>;
}

export async function createMessage(payload: {
  company_id: number;
  type: string;
  content: string;
  status?: string;
}) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Create message failed (${res.status})`);
  return res.json();
}
