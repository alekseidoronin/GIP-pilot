const { GoogleGenerativeAI } = require("@google/generative-ai");

function getClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

async function generate(prompt) {
  const client = getClient();
  if (!client) {
    return "Gemini API key is not configured. Provide GEMINI_API_KEY to enable AI generation.";
  }

  const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { generate };
