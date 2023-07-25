

function showFavoriteProducts() {
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const favoriteList = document.getElementById('favorite-list');
  
    if (favoriteProducts.length === 0) {
      favoriteList.innerHTML = '<li>No favorite products added yet.</li>';
    } else {
      favoriteList.innerHTML = ''; // Curățăm lista anterioară
  
      favoriteProducts.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} Lei`;
  
        // Adăugăm butonul pentru eliminarea produsului din favorite
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeFavorite(product.name, product.price);
        });
  
        li.appendChild(removeButton);
        favoriteList.appendChild(li);
      });
    }
  }



  function removeFavorite(name, price) {
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const updatedFavorites = favoriteProducts.filter((product) => !(product.name === name && product.price === price));
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    showFavoriteProducts(); // Actualizăm lista de favorite după eliminarea produsului
  }
  
  


  
// Afișăm produsele favorite
const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
const favoriteList = document.getElementById('favorite-list');

if (favoriteProducts.length === 0) {
  favoriteList.innerHTML = '<li>No favorite products added yet.</li>';
} else {
  favoriteProducts.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.price} Lei`;

    // Adăugăm butonul pentru ștergerea produsului din favorite
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove ';
    removeButton.addEventListener('click', () => {
      removeFavorite(product.name, product.price);
    });

    li.appendChild(removeButton);
    favoriteList.appendChild(li);
  });
}
  