const sheetURL = "TON_LIEN_GOOGLE_SHEET_CSV";

async function loadMenu(){

  const response = await fetch(sheetURL);
  const data = await response.text();

  const rows = data.split("\n").slice(1);

  const menu = {};

  rows.forEach(row => {

    const cols = row.split(",");

    const category = cols[0];
    const nameFR = cols[1];
    const nameEN = cols[2];
    const price = cols[3];

    if(!menu[category]){
      menu[category] = [];
    }

    menu[category].push({
      nameFR,
      nameEN,
      price
    });

  });

  renderMenu(menu);
}

function renderMenu(menu){

  const container = document.getElementById("menu");

  for(let category in menu){

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
