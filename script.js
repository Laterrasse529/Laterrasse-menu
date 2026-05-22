const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvxh3BCH27lCxRDCGpOnVVMJ4UmBWLP4E8Cc7OhrpAbnxAp8fTSbX0BdLPy0MKoMinU0NyP6ZgTciK/pub?output=csv";

async function loadMenu() {

  try {

    const response = await fetch(sheetURL);
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

      if (!menu[category]) {
        menu[category] = [];
      }

      menu[category].push({
        nameFR,
        nameEN,
        price
      });

    });

    renderMenu(menu);

  } catch (error) {

    document.getElementById("menu").innerHTML = `
      <div class="loading">
        Impossible de charger le menu.
      </div>
    `;

    console.error(error);

  }

}

function renderMenu(menu) {

  const container = document.getElementById("menu");

  container.innerHTML = "";

  for (let category in menu) {

    const section = document.createElement("div");

    section.className = "category";

    section.innerHTML = `
      <h2>${category}</h2>
    `;

    menu[category].forEach(item => {

      section.innerHTML += `
        <div class="menu-item">

          <div>
            <div class="item-name">${item.nameFR}</div>
            <div class="item-en">${item.nameEN}</div>
          </div>

          <div class="price">${item.price}</div>

        </div>
      `;

    });

    container.appendChild(section);

  }

}

loadMenu();
