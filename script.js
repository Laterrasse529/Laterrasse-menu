const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvxh3BCH27lCxRDCGpOnVVMJ4UmBWLP4E8Cc7OhrpAbnxAp8fTSbX0BdLPy0MKoMinU0NyP6ZgTciK/pub?output=csv";

// Mapping of menu categories to icon/fontawesome classes and English translation
const categoryData = {
  "PETIT DÉJEUNER":      { icon: "fa-egg",          en: "BREAKFAST" },
  "CAFÉS":               { icon: "fa-coffee",       en: "COFFEE" },
  "BOISSONS CHAUDES":    { icon: "fa-mug-hot",      en: "HOT DRINKS" },
  "JUS & COCKTAILS":     { icon: "fa-wine-glass-alt",en: "JUICES & COCKTAILS" },
  "CRÊPES & GAUFRES":    { icon: "fa-ice-cream",    en: "CREPES & WAFFLES" },
  "SANDWICHS & PANINIS": { icon: "fa-bread-slice",  en: "SANDWICHES & PANINIS" },
  "BURGERS":             { icon: "fa-hamburger",    en: "BURGERS" },
  "SALADES":             { icon: "fa-leaf",         en: "SALADS" },
  "DESSERTS":            { icon: "fa-birthday-cake",en: "DESSERTS" },
  "GLACES":              { icon: "fa-ice-cream",    en: "ICE CREAM" }
};

function getCategoryData(cat) {
  // Returns icon and en translation for the category otherwise defaults
  const upper = cat.trim().toUpperCase();
  return categoryData[upper] || { icon: "fa-utensils", en: "" };
}

async function loadMenu() {
  const main = document.getElementById("menu");
  main.innerHTML = `<div class="loading">Chargement du menu...</div>`;
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.text();
    const rows = data.split("\n").slice(1);
    const menu = {};

    rows.forEach(row => {
      if (!row.trim()) return;
      const cols = row.split(",");
      if (cols.length < 4) return;
      const category = cols[0].trim();
      const nameFR = cols[1].trim();
      const nameEN = cols[2].trim();
      const price = cols[3].trim();
      if (!category || !nameFR) return;
      if (!menu[category]) menu[category] = [];
      menu[category].push({ nameFR, nameEN, price });
    });

    // Render accordion menu
    let html = `<div class="menu-accordion">`;
    Object.keys(menu).forEach((category, idx) => {
      const catData = getCategoryData(category);
      const catID = "cat"+idx;
      html += `
      <div class="accordion-item">
        <button class="accordion-header" aria-expanded="false" aria-controls="${catID}">
          <i class="fas ${catData.icon}"></i>
          <span>
            <span class="cat-fr">${category}</span>
            <span class="cat-en">${catData.en}</span>
          </span>
          <i class="fas fa-chevron-down chevron"></i>
        </button>
        <div class="accordion-panel" id="${catID}" hidden>
          ${menu[category].map(item => `
            <div class="menu-item-row">
              <span>
                <span class="item-name">${item.nameFR}</span>
                ${item.nameEN ? `<span class="item-en">${item.nameEN}</span>` : ""}
              </span>
              <span class="item-price">${item.price}</span>
            </div>
          `).join('')}
        </div>
      </div>
      `;
    });
    html += `</div>`;
    main.innerHTML = html;

    // Accordion behavior
    document.querySelectorAll('.accordion-header').forEach(btn => {
      btn.addEventListener('click', function() {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        // Close all
        document.querySelectorAll('.accordion-header').forEach(b2 => {
          b2.setAttribute('aria-expanded', 'false');
          b2.parentElement.querySelector('.accordion-panel').hidden = true;
        });
        // Open selected if it was closed
        if (!expanded) {
          btn.setAttribute('aria-expanded', 'true');
          btn.parentElement.querySelector('.accordion-panel').hidden = false;
        }
      });
    });
    // Optionally open first by default
    const firstBtn = document.querySelector('.accordion-header');
    if (firstBtn) {
      firstBtn.click();
    }

  } catch (error) {
    main.innerHTML = `<div class="loading">Impossible de charger le menu.</div>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadMenu);
