import { NextRequest, NextResponse } from "next/server";
import { backendProxyFetch } from "../../../lib/backendProxy";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.search || "";
  const res = await backendProxyFetch(`/api/messages${search}`, { method: "GET" });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const res = await backendProxyFetch("/api/messages", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" }
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" }
  });
}
