import "server-only";

const rawBackendBase =
  process.env.BACKEND_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gip-pilot.duckdns.org";

const BACKEND_BASE_URL = rawBackendBase.endsWith("/api") ? rawBackendBase.slice(0, -4) : rawBackendBase;

const AUTH_EMAIL = process.env.BACKEND_AUTH_EMAIL || "alexey@3dkonstruktiv.ru";
const AUTH_PASSWORD = process.env.BACKEND_AUTH_PASSWORD || "test";

let cachedToken: string | null = null;

async function loginAndGetToken() {
  const res = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: AUTH_EMAIL, password: AUTH_PASSWORD }),
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Backend login failed (${res.status})`);
  }

  const data = (await res.json()) as { token?: string };
  if (!data.token) {
    throw new Error("Backend login returned no token");
  }

  cachedToken = data.token;
  return data.token;
}

async function getToken() {
  if (cachedToken) return cachedToken;
  return loginAndGetToken();
}

export async function backendProxyFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  let res = await fetch(`${BACKEND_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });

  if (res.status === 401) {
    const refreshed = await loginAndGetToken();
    headers.set("Authorization", `Bearer ${refreshed}`);
    res = await fetch(`${BACKEND_BASE_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store"
    });
  }

  return res;
}

export async function backendProxyJson<T>(path: string, init: RequestInit = {}) {
  const res = await backendProxyFetch(path, init);
  if (!res.ok) {
    throw new Error(`Backend proxy failed (${res.status}) for ${path}`);
  }
  return (await res.json()) as T;
}
