const events = [
  { title: "Åpningskonsert", category: "Musikk", time: "Fredag 18:00", price: 350 },
  { title: "Street Food Night", category: "Mat", time: "Fredag 20:00", price: 180 },
  { title: "Design for Alle", category: "Foredrag", time: "Lørdag 12:00", price: 120 },
  { title: "Midnattsjam", category: "Musikk", time: "Lørdag 23:00", price: 290 }
];

const themeBtn = document.getElementById("themeBtn");
const programGrid = document.getElementById("programGrid");

function renderProgram() {
  if (!programGrid) return;

  programGrid.innerHTML = "";
  for (const item of events) {
    const card = document.createElement("article");
    card.className = "program-card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p class="meta">${item.category} • ${item.time}</p>
      <p>Fra ${item.price} kr</p>
    `;
    programGrid.appendChild(card);
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn?.setAttribute("aria-pressed", "true");
    if (themeBtn) themeBtn.textContent = "Lys modus";
  }

  themeBtn?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.setAttribute("aria-pressed", String(isDark));
    themeBtn.textContent = isDark ? "Lys modus" : "Mørk modus";
  });
}

renderProgram();
initThemeToggle();
