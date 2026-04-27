function cleanEnv(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/^"(.*)"$/, "$1");
}

function parseJsonSafely(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return parseJsonSafely(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return parseJsonSafely(raw);
}

function normalizeContactPayload(payload) {
  const input = payload && typeof payload === "object" ? payload : {};

  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    topic: String(input.topic ?? "").trim(),
    message: String(input.message ?? "").trim()
  };
}

function validateContactPayload(payload) {
  const data = normalizeContactPayload(payload);
  const errors = [];

  if (data.name.length < 2) errors.push("Nom invalide");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Email invalide");
  if (!["commande", "livraison", "retour", "partenariat"].includes(data.topic)) errors.push("Sujet invalide");
  if (data.message.length < 10) errors.push("Message trop court");
  if (data.message.length > 2000) errors.push("Message trop long");

  return {
    isValid: errors.length === 0,
    errors,
    data
  };
}

async function sendBrevoContactEmail(contact) {
  const apiKey = cleanEnv(process.env.BREVO_API_KEY);
  const senderEmail = cleanEnv(process.env.BREVO_SENDER_EMAIL);
  const senderName = cleanEnv(process.env.BREVO_SENDER_NAME) || "Bazario";

  if (!apiKey || !senderEmail) {
    return { ok: false, code: "BREVO_CONFIG_MISSING" };
  }

  const payload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: senderEmail }],
    replyTo: { email: contact.email, name: contact.name },
    subject: `Nouveau message Bazario - ${contact.topic}`,
    htmlContent: `
      <h3>Nouveau message depuis le site Bazario</h3>
      <p><strong>Nom :</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(contact.email)}</p>
      <p><strong>Sujet :</strong> ${escapeHtml(contact.topic)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(contact.message).replace(/\n/g, "<br>")}</p>
    `
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    return response.ok ? { ok: true } : { ok: false, code: `BREVO_HTTP_${response.status}` };
  } catch {
    return { ok: false, code: "BREVO_NETWORK_ERROR" };
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await parseBody(req);
  const validation = validateContactPayload(payload);

  if (!validation.isValid) {
    return res.status(400).json({
      error: "Payload invalide",
      details: validation.errors
    });
  }

  const brevo = await sendBrevoContactEmail(validation.data);

  return res.status(200).json({
    success: true,
    contact: {
      topic: validation.data.topic,
      email: validation.data.email
    },
    warning: brevo.ok ? null : brevo.code
  });
};
