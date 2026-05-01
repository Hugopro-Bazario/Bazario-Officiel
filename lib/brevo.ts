import * as Brevo from "@getbrevo/brevo";

type Recipient = {
  email: string;
  name?: string;
};

type TransactionalEmailInput = {
  to: Recipient;
  templateId: number;
  params?: Record<string, unknown>;
};

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

function createBrevoClient() {
  const apiKey = cleanEnv(process.env.BREVO_API_KEY);
  if (!apiKey) {
    throw new Error("Missing BREVO_API_KEY.");
  }

  const client = new Brevo.TransactionalEmailsApi();
  client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  return client;
}

function getSenderConfig() {
  const email = cleanEnv(process.env.BAZARIO_SENDER_EMAIL) || cleanEnv(process.env.BREVO_SENDER_EMAIL);
  const name = cleanEnv(process.env.BAZARIO_SENDER_NAME) || cleanEnv(process.env.BREVO_SENDER_NAME) || "Bazario";

  if (!email) {
    throw new Error("Missing BAZARIO_SENDER_EMAIL or BREVO_SENDER_EMAIL.");
  }

  return { email, name };
}

export async function sendTransactionalEmail(input: TransactionalEmailInput) {
  const client = createBrevoClient();
  const sender = getSenderConfig();
  const payload = new Brevo.SendSmtpEmail();

  payload.to = [{ email: input.to.email, name: input.to.name }];
  payload.sender = sender;
  payload.templateId = input.templateId;
  payload.params = input.params || {};

  await client.sendTransacEmail(payload);
}
