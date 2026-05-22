name=script.js
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvxh3BCH27lCxRDCGpOnVVMJ4UmBWLP4E8Cc7OhrpAbnxAp8fTSbX0BdLPy0MKoMinU0NyP6ZgTciK/pub?output=csv";

const categoryIcons = {
  "PETIT DÉJEUNER": "fa-egg",
  "CAFÉS": "fa-coffee",
  "BOISSONS CHAUDES": "fa-mug-hot",
  "JUS & COCKTAILS": "fa-wine-glass-alt",
  "CRÊPES & GAUFRES": "fa-ice-cream",
  "SANDWICHS & PANINIS": "fa-bread-slice",
  "BURGERS": "fa-hamburger",
  "SALADES": "fa-leaf",
  "DESSERTS": "fa-birthday-cake",
  "GLACES": "fa-ice-cream"
};

function toCategoryIcon(cat) {
  const key = Object.keys(categoryIcons).find(k => cat.toUpperCase().includes(k));
  return key ? categoryIcons[key] : "fa-utensils";
}

async function loadMenu() {
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
      const category = cols[0]?.trim();
      const nameFR = cols[1]?.trim();
      const nameEN = cols[2]?.trim();
      const price = cols[3]?.trim();
      if (!category || !nameFR) return;
      if (!menu[category]) menu[category] = [];
      menu[category].push({ nameFR, nameEN, price });
    });

    renderCategories(menu);
  } catch (e) {
    document.querySelector('.menu-list').innerHTML = `<div class="loading">Impossible de charger le menu.</div>`;
    document.getElementById('menu-details').innerHTML = '';
    console.error(e);
  }
}

function renderCategories(menu) {
  const nav = document.querySelector('.menu-list');
  const details = document.getElementById('menu-details');
  nav.innerHTML = '';
  details.innerHTML = '';
  let f = true; // first open by default

  Object.keys(menu).forEach(category => {
    const catId = category.replace(/\s+/g, '-').toLowerCase();
    const icon = toCategoryIcon(category);

    // Category summary/accordion header
    const catBtn = document.createElement('button');
    catBtn.className = 'category-btn';
    catBtn.setAttribute('aria-expanded', f ? 'true' : 'false');
    catBtn.setAttribute('aria-controls', `cat-${catId}`);
    catBtn.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>
        <span class="cat-fr">${category}</span>
        <span class="cat-en">${menu[category][0].nameEN ? menu[category][0].nameEN : ''}</span>
      </span>
      <i class="fas fa-chevron-down"></i>
    `;

    nav.appendChild(catBtn);

    // Category details panel
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'category-panel';
    detailsDiv.id = `cat-${catId}`;
    detailsDiv.style.display = f ? 'block' : 'none';

    let itHtml = `<div class="category-items">`;
    menu[category].forEach(item => {
      itHtml += `
        <div class="menu-item">
          <span class="item-name">${item.nameFR}</span>
          ${item.nameEN ? `<span class="item-en">${item.nameEN}</span>` : ""}
          <span class="item-price">${item.price}</span>
        </div>
      `;
    });
    itHtml += `</div>`;
    detailsDiv.innerHTML = itHtml;
    details.appendChild(detailsDiv);

    catBtn.addEventListener('click', () => {
      const expanded = catBtn.getAttribute('aria-expanded') === 'true';
      // Close all categories
      nav.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      details.querySelectorAll('.category-panel').forEach(panel => panel.style.display = 'none');
      // Open selected
      if (!expanded) {
        catBtn.setAttribute('aria-expanded', 'true');
        detailsDiv.style.display = 'block';
      }
    });

    f = false;
  });
}

document.addEventListener('DOMContentLoaded', loadMenu);
