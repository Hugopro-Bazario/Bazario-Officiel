import { getSupabaseClient } from "./supabase/client.js";

const supabase = getSupabaseClient();

const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("auth-email");
const passwordInput = document.getElementById("auth-password");
const sessionState = document.getElementById("session-state");
const authFeedback = document.getElementById("auth-feedback");
const todosFeedback = document.getElementById("todos-feedback");
const todosList = document.getElementById("todos-list");
const signUpBtn = document.getElementById("signup-btn");
const signOutBtn = document.getElementById("signout-btn");
const refreshTodosBtn = document.getElementById("refresh-todos");

function setFeedback(node, type, message) {
  if (!node) return;
  if (!message) {
    node.className = "notice";
    node.textContent = "";
    return;
  }

  node.className = `notice ${type}`;
  node.textContent = message;
}

function setSessionText(message) {
  if (sessionState) {
    sessionState.textContent = message;
  }
}

function setAuthControlsState({ canSignIn, canSignOut }) {
  if (signOutBtn) signOutBtn.disabled = !canSignOut;
  if (signUpBtn) signUpBtn.disabled = !canSignIn;
}

function renderTodos(rows) {
  if (!todosList) return;
  todosList.innerHTML = "";

  for (const row of rows) {
    const item = document.createElement("li");
    const id = row?.id ?? "—";
    const name = row?.name ?? "Sans nom";
    item.textContent = `${id} — ${name}`;
    todosList.appendChild(item);
  }
}

async function loadTodos() {
  if (!supabase) {
    setFeedback(todosFeedback, "error", "Supabase non configuré (variables VITE_* manquantes).");
    renderTodos([]);
    return;
  }

  setFeedback(todosFeedback, "info", "Chargement des tâches...");

  const { data, error } = await supabase
    .from("todos")
    .select("id, name")
    .order("id", { ascending: true })
    .limit(20);

  if (error) {
    renderTodos([]);
    setFeedback(todosFeedback, "error", `Lecture impossible: ${error.message}`);
    return;
  }

  const rows = Array.isArray(data) ? data : [];
  renderTodos(rows);
  setFeedback(todosFeedback, "success", rows.length > 0 ? `${rows.length} tâche(s) chargée(s).` : "Aucune tâche trouvée.");
}

async function refreshSessionState() {
  if (!supabase) {
    setSessionText("Session Supabase indisponible (variables VITE_* non définies).");
    setAuthControlsState({ canSignIn: false, canSignOut: false });
    return;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    setSessionText(`Erreur session: ${error.message}`);
    setAuthControlsState({ canSignIn: true, canSignOut: false });
    return;
  }

  const session = data?.session;
  if (!session) {
    setSessionText("Aucun utilisateur connecté.");
    setAuthControlsState({ canSignIn: true, canSignOut: false });
    return;
  }

  setSessionText(`Connecté: ${session.user.email ?? "utilisateur sans email"}`);
  setAuthControlsState({ canSignIn: true, canSignOut: true });
}

async function handleSignIn(event) {
  event.preventDefault();
  if (!supabase || !emailInput || !passwordInput) return;

  setFeedback(authFeedback, "info", "Connexion en cours...");
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setFeedback(authFeedback, "error", `Connexion échouée: ${error.message}`);
    return;
  }

  setFeedback(authFeedback, "success", "Connexion réussie.");
  await refreshSessionState();
  await loadTodos();
}

async function handleSignUp() {
  if (!supabase || !emailInput || !passwordInput) return;

  setFeedback(authFeedback, "info", "Création du compte...");
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    setFeedback(authFeedback, "error", `Inscription échouée: ${error.message}`);
    return;
  }

  const needsEmailConfirmation = !data?.session;
  setFeedback(
    authFeedback,
    "success",
    needsEmailConfirmation
      ? "Compte créé. Vérifie ta boîte mail pour confirmer l’adresse."
      : "Compte créé et connecté."
  );

  await refreshSessionState();
  await loadTodos();
}

async function handleSignOut() {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) {
    setFeedback(authFeedback, "error", `Déconnexion échouée: ${error.message}`);
    return;
  }

  setFeedback(authFeedback, "success", "Déconnecté.");
  renderTodos([]);
  setFeedback(todosFeedback, "info", "Connecte-toi pour recharger la table todos.");
  await refreshSessionState();
}

if (authForm) {
  authForm.addEventListener("submit", handleSignIn);
}
if (signUpBtn) {
  signUpBtn.addEventListener("click", handleSignUp);
}
if (signOutBtn) {
  signOutBtn.addEventListener("click", handleSignOut);
}
if (refreshTodosBtn) {
  refreshTodosBtn.addEventListener("click", loadTodos);
}

if (supabase) {
  supabase.auth.onAuthStateChange(async () => {
    await refreshSessionState();
  });
}

refreshSessionState();
loadTodos();
