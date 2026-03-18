const db = require("../models/db");
const { generate } = require("../gemini");

async function listGipMap(req, res) {
  const { company_id } = req.query;
  const values = [];
  let where = "";
  if (company_id) {
    values.push(company_id);
    where = `WHERE gr.company_id = $1`;
  }

  const { rows } = await db.query(
    `SELECT gr.id, gr.company_id, c.name AS company, gr.lpr_role, gr.entry_route, gr.redirect_phrase, gr.status, gr.created_at
     FROM gip_routes gr
     JOIN companies c ON c.id = gr.company_id
     ${where}
     ORDER BY gr.created_at DESC`,
    values
  );
  res.json(rows);
}

async function createGipMap(req, res) {
  const { company_id, lpr_role, entry_route, redirect_phrase, status } = req.body || {};
  if (!company_id) return res.status(400).json({ error: "company_id is required" });

  const { rows } = await db.query(
    `INSERT INTO gip_routes (company_id, lpr_role, entry_route, redirect_phrase, status)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, company_id, lpr_role, entry_route, redirect_phrase, status, created_at`,
    [company_id, lpr_role || null, entry_route || null, redirect_phrase || null, status || "pending"]
  );
  res.status(201).json(rows[0]);
}

async function generateGipMap(req, res) {
  const company = req.body?.company || "STONE";
  const prompt = `Сформируй карту входа к ГИП для компании ${company}. Верни JSON объект с lpr_role, entry_route, redirect_phrase.`;
  const aiText = await generate(prompt);
  res.json({ company, generated_text: aiText });
}

module.exports = { listGipMap, createGipMap, generateGipMap };
