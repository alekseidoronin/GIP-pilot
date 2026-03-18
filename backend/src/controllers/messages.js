const db = require("../models/db");
const { generate } = require("../gemini");

async function listMessages(req, res) {
  const { company_id } = req.query;
  const values = [];
  let where = "";
  if (company_id) {
    values.push(company_id);
    where = `WHERE m.company_id = $1`;
  }

  const { rows } = await db.query(
    `SELECT m.id, m.company_id, c.name AS company, m.type, m.content, m.sent_at, m.response, m.status
     FROM messages m
     JOIN companies c ON c.id = m.company_id
     ${where}
     ORDER BY m.id DESC`,
    values
  );
  return res.json(rows);
}

async function createMessage(req, res) {
  const { company_id, type, content, status } = req.body || {};
  if (!company_id || !type || !content) {
    return res.status(400).json({ error: "company_id, type and content are required" });
  }

  const { rows } = await db.query(
    `INSERT INTO messages (company_id, type, content, status)
     VALUES ($1,$2,$3,$4)
     RETURNING id, company_id, type, content, sent_at, response, status`,
    [company_id, type, content, status || "draft"]
  );
  return res.status(201).json(rows[0]);
}

async function updateMessage(req, res) {
  const { id } = req.params;
  const { content, status, sent_at, response } = req.body || {};

  const { rows } = await db.query(
    `UPDATE messages
     SET content = COALESCE($1, content),
         status = COALESCE($2, status),
         sent_at = COALESCE($3, sent_at),
         response = COALESCE($4, response)
     WHERE id = $5
     RETURNING id, company_id, type, content, sent_at, response, status`,
    [content, status, sent_at, response, id]
  );

  if (!rows.length) return res.status(404).json({ error: "Message not found" });
  return res.json(rows[0]);
}

async function generateMessage(req, res) {
  const company = req.body?.company || "STONE";
  const type = req.body?.type || "first";
  const limits = {
    first: 400,
    followup1: 250,
    followup2: 200,
    redirect: 150
  };
  const maxLen = limits[type] || 250;

  const prompt = `Сгенерируй деловое сообщение типа ${type} для компании ${company}. Ограничение: ${maxLen} символов.`;
  const aiText = await generate(prompt);

  return res.json({ company, type, content: aiText.slice(0, maxLen) });
}

module.exports = {
  listMessages,
  createMessage,
  updateMessage,
  generateMessage
};
