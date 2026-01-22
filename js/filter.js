// filter.js - global filtering logic
// CURRENT_CATEGORY must be defined in HTML before including this

const grid = document.getElementById("productGrid");
const filterSelect = document.getElementById("filterSelect");

// get products for this category
let currentProducts = PRODUCTS.filter(p => p.category === CURRENT_CATEGORY);

// render function
function renderProducts(products) {
  grid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="./assets/products/${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
    `;
    grid.appendChild(card);
  });
}

// sorting/filter function
function applyFilter(option) {
  let filtered = [...currentProducts];

  switch(option) {
    case "price_under_2000":
      filtered = filtered.filter(p => p.price < 2000);
      break;
    case "price_3000_5000":
      filtered = filtered.filter(p => p.price >= 3000 && p.price <= 5000);
      break;
    case "price_above_5000":
      filtered = filtered.filter(p => p.price > 5000);
      break;
    case "price":
      filtered.sort((a,b) => a.price - b.price);
      break;
    case "trending":
      filtered.sort((a,b) => b.price - a.price); // demo: trending = higher price first
      break;
    case "recommended":
    default:
      filtered = [...currentProducts]; // original order
  }

  renderProducts(filtered);
}

// initial render
renderProducts(currentProducts);

// event listener
filterSelect.addEventListener("change", () => {
  applyFilter(filterSelect.value);
});
