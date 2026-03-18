const db = require("../models/db");
const { generate } = require("../gemini");

async function listCompanies(req, res) {
  const { priority, status } = req.query;
  const clauses = [];
  const values = [];

  if (priority) {
    values.push(priority);
    clauses.push(`priority = $${values.length}`);
  }
  if (status) {
    values.push(status);
    clauses.push(`status = $${values.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const { rows } = await db.query(
    `SELECT id, name, city, why_suitable, website, priority, status, touches, created_at
     FROM companies ${where} ORDER BY created_at DESC`,
    values
  );
  return res.json(rows);
}

async function createCompany(req, res) {
  const { name, city, why_suitable, website, priority, status } = req.body || {};
  if (!name) return res.status(400).json({ error: "name is required" });

  const { rows } = await db.query(
    `INSERT INTO companies (name, city, why_suitable, website, priority, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, city, why_suitable, website, priority, status, touches, created_at`,
    [name, city || null, why_suitable || null, website || null, priority || "medium", status || "new"]
  );
  return res.status(201).json(rows[0]);
}

async function updateCompany(req, res) {
  const { id } = req.params;
  const { name, city, why_suitable, website, priority, status, touches } = req.body || {};

  const { rows } = await db.query(
    `UPDATE companies
     SET name = COALESCE($1, name),
         city = COALESCE($2, city),
         why_suitable = COALESCE($3, why_suitable),
         website = COALESCE($4, website),
         priority = COALESCE($5, priority),
         status = COALESCE($6, status),
         touches = COALESCE($7, touches)
     WHERE id = $8
     RETURNING id, name, city, why_suitable, website, priority, status, touches, created_at`,
    [name, city, why_suitable, website, priority, status, touches, id]
  );

  if (!rows.length) return res.status(404).json({ error: "Company not found" });
  return res.json(rows[0]);
}

async function removeCompany(req, res) {
  const { id } = req.params;
  const { rowCount } = await db.query("DELETE FROM companies WHERE id = $1", [id]);
  if (!rowCount) return res.status(404).json({ error: "Company not found" });
  return res.status(204).send();
}

async function generateCompanies(req, res) {
  const city = req.body?.city || "Москва";
  const prompt = `Сформируй 5 девелоперских компаний для ${city} в формате JSON массива с полями name, city, why_suitable, website, priority.`;
  const aiText = await generate(prompt);

  return res.json({
    city,
    generated_text: aiText
  });
}

module.exports = {
  listCompanies,
  createCompany,
  updateCompany,
  removeCompany,
  generateCompanies
};
