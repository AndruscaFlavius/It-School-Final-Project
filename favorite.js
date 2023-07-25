// Funcția pentru afișarea produselor favorite
function showFavoriteProducts() {
  const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  const favoriteList = document.getElementById("favorite-list");

  if (favoriteProducts.length === 0) {
    favoriteList.innerHTML = '<li class="no-favorites">No favorite products added yet.</li>';
  } else {
    favoriteList.innerHTML = ""; // Curățăm lista anterioară

    favoriteProducts.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - ${product.price} Lei`;
      li.classList.add("favorite-product"); // Adăugăm clasa pentru stilul produsului

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button"); // Adăugăm clasa pentru stilul butonului de remove

      removeButton.addEventListener("click", () => {
        removeFavorite(product.name, product.price);
      });

      li.appendChild(removeButton);
      favoriteList.appendChild(li);
    });
  }
}

// Funcția pentru eliminarea unui produs din lista de favorite
function removeFavorite(name, price) {
  const favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  const updatedFavorites = favoriteProducts.filter((product) => !(product.name === name && product.price === price));
  localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
  showFavoriteProducts(); // Actualizăm lista de favorite după eliminarea produsului
}

// Afișăm inițial produsele favorite la încărcarea paginii
showFavoriteProducts();