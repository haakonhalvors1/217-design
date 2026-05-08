const events = [
  { id: 1, title: "Åpningskonsert", category: "musikk", time: "Fredag 18:00", price: 350 },
  { id: 2, title: "Street Food Night", category: "mat", time: "Fredag 20:00", price: 180 },
  { id: 3, title: "Design for Alle", category: "foredrag", time: "Lørdag 12:00", price: 120 },
  { id: 4, title: "Midnattsjam", category: "musikk", time: "Lørdag 23:00", price: 290 },
  { id: 5, title: "Lokal Smak", category: "mat", time: "Søndag 14:00", price: 150 }
];

const state = {
  activeFilter: "alle",
  personas: load("personas", [
    { id: "u1", name: "Student Sara", role: "Besøkende", favorites: [1], cart: [3], feedback: [] },
    { id: "u2", name: "Frivillig Felix", role: "Frivillig", favorites: [2, 4], cart: [], feedback: [] }
  ]),
  activePersonaId: load("activePersonaId", "u1")
};

const personaSelect = document.getElementById("personaSelect");
const eventList = document.getElementById("eventList");
const favoritesList = document.getElementById("favoritesList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");
const personaMeta = document.getElementById("personaMeta");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const evaluationBox = document.getElementById("evaluationBox");

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save() {
  localStorage.setItem("personas", JSON.stringify(state.personas));
  localStorage.setItem("activePersonaId", JSON.stringify(state.activePersonaId));
}

function getActivePersona() {
  return state.personas.find((p) => p.id === state.activePersonaId) ?? state.personas[0];
}

function renderPersonas() {
  personaSelect.innerHTML = "";

  state.personas.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} (${p.role})`;
    if (p.id === state.activePersonaId) option.selected = true;
    personaSelect.appendChild(option);
  });
}

function renderEvents() {
  const active = getActivePersona();
  const list = state.activeFilter === "alle"
    ? events
    : events.filter((e) => e.category === state.activeFilter);

  eventList.innerHTML = "";

  list.forEach((e) => {
    const card = document.createElement("article");
    card.className = "event";

    const isFav = active.favorites.includes(e.id);
    const inCart = active.cart.includes(e.id);

    card.innerHTML = `
      <h4>${e.title}</h4>
      <p>Kategori: ${e.category}</p>
      <p>Tid: ${e.time}</p>
      <p>Pris: ${e.price} kr</p>
      <div class="actions">
        <button data-action="fav" data-id="${e.id}">${isFav ? "★ Favoritt" : "☆ Favoritt"}</button>
        <button data-action="cart" data-id="${e.id}">${inCart ? "Fjern fra kurv" : "Legg i kurv"}</button>
      </div>
    `;

    eventList.appendChild(card);
  });
}

function renderPersonaData() {
  const p = getActivePersona();
  personaMeta.textContent = `${p.name} er logget inn som ${p.role}. Data lagres separat per testbruker lokalt.`;

  favoritesList.innerHTML = "";
  p.favorites.forEach((id) => {
    const li = document.createElement("li");
    li.textContent = events.find((e) => e.id === id)?.title ?? "Ukjent";
    favoritesList.appendChild(li);
  });

  cartList.innerHTML = "";
  p.cart.forEach((id) => {
    const event = events.find((e) => e.id === id);
    const li = document.createElement("li");
    li.textContent = event ? `${event.title} (${event.price} kr)` : "Ukjent";
    cartList.appendChild(li);
  });

  const total = p.cart
    .map((id) => events.find((e) => e.id === id)?.price ?? 0)
    .reduce((sum, n) => sum + n, 0);
  cartTotal.textContent = String(total);

  feedbackList.innerHTML = "";
  p.feedback.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = `${f.rating}/5 – ${f.comment}`;
    feedbackList.appendChild(li);
  });
}

function renderEvaluation() {
  const p = getActivePersona();
  const checklist = [
    {
      title: "Separat brukerdata",
      status: "Bestått",
      info: "Favoritter, kurv og feedback er adskilt per testbruker via localStorage."
    },
    {
      title: "Rolleforståelse",
      status: "Delvis",
      info: "Roller vises i UI, men har ikke ulike rettigheter siden dette er frontend-only."
    },
    {
      title: "Skalerbarhet for flere brukere",
      status: "Begrenset",
      info: "Fungerer for simulering lokalt. Reell støtte krever backend + database."
    },
    {
      title: "Gjeldende aktiv bruker",
      status: "Info",
      info: `${p.name} (${p.role})`
    }
  ];

  evaluationBox.innerHTML = "";
  checklist.forEach((item) => {
    const div = document.createElement("div");
    div.className = "eval-item";
    div.innerHTML = `<strong>${item.title}:</strong> ${item.status}<br><span class="muted">${item.info}</span>`;
    evaluationBox.appendChild(div);
  });
}

function toggleFavorite(eventId) {
  const p = getActivePersona();
  p.favorites = p.favorites.includes(eventId)
    ? p.favorites.filter((id) => id !== eventId)
    : [...p.favorites, eventId];
}

function toggleCart(eventId) {
  const p = getActivePersona();
  p.cart = p.cart.includes(eventId)
    ? p.cart.filter((id) => id !== eventId)
    : [...p.cart, eventId];
}

function refresh() {
  renderPersonas();
  renderEvents();
  renderPersonaData();
  renderEvaluation();
  save();
}

personaSelect.addEventListener("change", (e) => {
  state.activePersonaId = e.target.value;
  refresh();
});

document.getElementById("newPersonaBtn").addEventListener("click", () => {
  const name = prompt("Navn på testbruker:");
  if (!name) return;

  const role = prompt("Rolle (f.eks. Besøkende/Frivillig/Admin):", "Besøkende") || "Besøkende";
  const id = `u${Date.now()}`;

  state.personas.push({ id, name, role, favorites: [], cart: [], feedback: [] });
  state.activePersonaId = id;
  refresh();
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    state.activeFilter = chip.dataset.filter;
    renderEvents();
  });
});

eventList.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "fav") toggleFavorite(id);
  if (action === "cart") toggleCart(id);

  refresh();
});

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const p = getActivePersona();
  const formData = new FormData(feedbackForm);

  p.feedback.push({
    rating: Number(formData.get("rating")),
    comment: String(formData.get("comment")).trim()
  });

  feedbackForm.reset();
  refresh();
});

if (!state.personas.some((p) => p.id === state.activePersonaId)) {
  state.activePersonaId = state.personas[0]?.id;
}

refresh();
