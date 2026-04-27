import { getSupabaseClient } from "./supabase/client.js";

const statusLine = document.getElementById("supabase-session-status");
const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("fullName");
const supabase = getSupabaseClient();

function setSessionStatus(message) {
  if (statusLine) {
    statusLine.innerHTML = `<strong>Session Supabase :</strong> ${message}`;
  }
}

async function hydrateCheckoutFromSession() {
  if (!supabase) {
    setSessionStatus("non configurée.");
    return;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    setSessionStatus(`erreur (${error.message}).`);
    return;
  }

  const session = data?.session;
  if (!session) {
    setSessionStatus("aucun utilisateur connecté.");
    return;
  }

  const user = session.user;
  const userEmail = user?.email ?? "";
  const fullName = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "";

  if (emailInput && userEmail && !emailInput.value) {
    emailInput.value = userEmail;
  }
  if (fullNameInput && fullName && !fullNameInput.value) {
    fullNameInput.value = fullName;
  }

  setSessionStatus(`connectée (${userEmail || "utilisateur authentifié"}).`);
}

hydrateCheckoutFromSession();
