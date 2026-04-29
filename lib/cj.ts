const CJ_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";
const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000;

type CjTokenCache = {
  token: string;
  expiresAt: number;
} | null;

let tokenCache: CjTokenCache = null;

function cleanEnv(value: string | undefined): string {
  return (value || "").trim();
}

function getCjConfig() {
  const email = cleanEnv(process.env.CJ_EMAIL) || cleanEnv(process.env.BAZARIO_CJ_EMAIL);
  const apiKey = cleanEnv(process.env.CJ_API_KEY) || cleanEnv(process.env.BAZARIO_CJ_API_KEY);
  const baseUrl = cleanEnv(process.env.CJ_API_BASE_URL) || CJ_BASE_URL;

  if (!email) {
    throw new Error("CJ email manquant (CJ_EMAIL ou BAZARIO_CJ_EMAIL).");
  }

  if (!apiKey) {
    throw new Error("CJ API key manquante (CJ_API_KEY ou BAZARIO_CJ_API_KEY).");
  }

  return { email, apiKey, baseUrl: baseUrl.replace(/\/$/, "") };
}

function getErrorMessage(payload: unknown): string {
  if (payload && typeof payload === "object") {
    const asRecord = payload as Record<string, unknown>;
    if (typeof asRecord.message === "string" && asRecord.message) return asRecord.message;
    if (typeof asRecord.error === "string" && asRecord.error) return asRecord.error;
  }
  return "Erreur CJ inconnue";
}

export async function getCjAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.token;
  }

  const { email, apiKey, baseUrl } = getCjConfig();
  const response = await fetch(`${baseUrl}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, apiKey })
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(`Auth CJ impossible (${response.status}): ${getErrorMessage(data)}`);
  }

  if (!data || typeof data !== "object") {
    throw new Error("Auth CJ: réponse invalide (JSON absent).");
  }

  const payload = data as Record<string, unknown>;
  if (payload.result === false) {
    throw new Error(`Auth CJ refusée: ${getErrorMessage(payload)}`);
  }

  const token = typeof payload.data === "string"
    ? payload.data
    : (payload.data as Record<string, unknown> | undefined)?.accessToken;

  if (!token || typeof token !== "string") {
    throw new Error("Auth CJ: token introuvable dans la réponse.");
  }

  tokenCache = {
    token,
    expiresAt: now + TOKEN_TTL_MS
  };

  return token;
}

type CjFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

// Note: CJ applique souvent une limite proche de 1 requête/seconde.
// Le throttling reste sous la responsabilité de l'appelant.
// Note: cache token en mémoire process; sur Vercel serverless, ce cache
// peut varier entre invocations, ce qui est acceptable ici.
export async function cjFetch(endpoint: string, options: CjFetchOptions = {}) {
  const { baseUrl } = getCjConfig();
  const token = await getCjAccessToken();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(`CJ HTTP ${response.status}: ${getErrorMessage(data)}`);
  }

  if (data && typeof data === "object" && (data as Record<string, unknown>).result === false) {
    const message = getErrorMessage(data);
    throw new Error(`CJ API error: ${message}`);
  }

  return data;
}
