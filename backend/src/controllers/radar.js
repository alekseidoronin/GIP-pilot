const db = require("../models/db");
const { generate } = require("../gemini");

async function listRadar(req, res) {
  const { city, date_from, date_to } = req.query;
  const clauses = [];
  const values = [];

  if (city) {
    values.push(city);
    clauses.push(`city = $${values.length}`);
  }
  if (date_from) {
    values.push(date_from);
    clauses.push(`date >= $${values.length}`);
  }
  if (date_to) {
    values.push(date_to);
    clauses.push(`date <= $${values.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const { rows } = await db.query(
    `SELECT id, object_name, city, stage, companies, link, date, status, priority, created_at
     FROM radar_objects ${where} ORDER BY date DESC NULLS LAST, created_at DESC`,
    values
  );
  res.json(rows);
}

async function createRadar(req, res) {
  const { object, city, stage, companies, link, date, status, priority } = req.body || {};
  if (!object) return res.status(400).json({ error: "object is required" });

  const { rows } = await db.query(
    `INSERT INTO radar_objects (object_name, city, stage, companies, link, date, status, priority)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id, object_name, city, stage, companies, link, date, status, priority, created_at`,
    [object, city || null, stage || null, companies || null, link || null, date || null, status || "new", priority || "medium"]
  );
  res.status(201).json(rows[0]);
}

async function generateRadar(req, res) {
  const city = req.body?.city || "Москва";
  const prompt = `Найди 5 инфоповодов/строительных проектов в городе ${city}. Верни JSON массив с полями object, city, stage, companies, link, date, priority.`;
  const aiText = await generate(prompt);
  res.json({ city, generated_text: aiText });
}

module.exports = { listRadar, createRadar, generateRadar };
