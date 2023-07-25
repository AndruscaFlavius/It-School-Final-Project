var cart = []; //Am declarat un array gol unde vor fii stocate produsele

window.onload = function () {
  //functia se apeleaza cand pagina este incarcata
  loadCartFromLocalStorage();
};

function loadCartFromLocalStorage() {
  //functia aceasta preia datele din localStorage
  var cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCart(); // Actualizare cos
    updatePayButton(); //Actualizare buton plata
  }
}

function addToCart(productName, price) {
  //aceasta functie adauga produsul in cos
  cart.push({ name: productName, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updatePayButton();
}

function updateCart() {
  //functie pt actualizarea cosului
  var cartItemsElement = document.getElementById("cartItems");
  var total = 0;
  var content = "";

  for (var i = 0; i < cart.length; i++) {
    //am folosit for pentru a parcurge produsele din cos
    var item = cart[i];
    content +=
      "<p style='color:green'>" +
      item.name +
      " - Lei" +
      item.price +
      " <button style='background-color: rgb(204, 182, 74); ; border:none ; border-radius:20px; color:white; outline:none ; ' onclick='removeFromCart(" +
      i +
      ")'>Remove</button></p>";
    total += item.price;
  }

  content += "<p style='color:green'><strong>Total: Lei" + total + "</strong></p>"; //in aceasta variabila adaugam informatiile
  cartItemsElement.innerHTML = content;

  var totalAmountElement = document.getElementById("totalAmount"); //este calculat si totalul
  console.log(totalAmountElement);
  totalAmountElement.innerHTML = "Total: Lei" + total;
}

//functia aceasta are scopul de a afisa sau ascunde cosul
function toggleCart() {
  var cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.style.display =
    cartItemsElement.style.display === "none" ? "block" : "none";
}
//functia pentru cautarea produsului
function search() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  var productsContainer = document.getElementById("products");
  var searchResultContainer = document.getElementById("searchItems");

  if (searchInput === "") {
    //se obtine valoarea introdusa in campul de cautare
    searchResultContainer.innerHTML = "";
    return;
  }

  for (var i = 0; i < productsContainer.children.length; i++) {
    //aici se cauta produsul cautat
    var productCard = productsContainer.children[i];
    var productName = productCard
      .getElementsByTagName("h3")[0]
      .textContent.toLowerCase();

    if (productName.includes(searchInput)) {
      searchResultContainer.innerHTML = productCard.outerHTML;
      break;
    } else {
      searchResultContainer.innerHTML =
        "<p>Produsul căutat nu a fost găsit.</p>"; //mesaj daca nu se gaseste produsul
    }
  }
}

function pay() {
  var totalAmount = calculateTotalAmount();
  var cartData = encodeURIComponent(JSON.stringify(cart)); //am convertit coșul într-un șir JSON
  var redirectUrl = "payment.html?suma=" + totalAmount + "&cart=" + cartData;
  window.location.href = redirectUrl;
}

function calculateTotalAmount() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); //am salvat cosul actualizat in lS
  updateCart();
  updatePayButton();
}

// Funcție pentru a afișa sau ascunde butonul de finalizare a plății
function updatePayButton() {
  var payButton = document.getElementById("payButton");
  if (cart.length > 0) {
    payButton.style.display = "block";
  } else {
    payButton.style.display = "none";
  }
}

//favorite
// Funcția pentru a adăuga sau înlătura produsele din lista de favorite și pentru actualizarea stilului butonului "favorite"
function toggleFavorite(button) {
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));
  const isProductInFavorites = button.classList.contains("selected");

  const favoriteProducts =
    JSON.parse(localStorage.getItem("favoriteProducts")) || [];

  if (isProductInFavorites) {
    // Produsul este deja în lista de favorite, îl elimin
    const updatedFavorites = favoriteProducts.filter(
      (product) => !(product.name === name && product.price === price)
    );
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));
    button.classList.remove("selected");
  } else {
    // Produsul nu este în lista de favorite,  îl adăug
    const newProduct = { name: name, price: price };
    favoriteProducts.push(newProduct);
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    button.classList.add("selected");
  }
}

// La începutul codului sau într-o funcție apelată la încărcarea paginii
window.onload = function () {
  loadFavoritesFromLocalStorage();
};

function loadFavoritesFromLocalStorage() {
  const favoriteProducts =
    JSON.parse(localStorage.getItem("favoriteProducts")) || [];

  favoriteProducts.forEach((product) => {
    const favoriteButton = document.querySelector(
      `button.favorite[data-name="${product.name}"][data-price="${product.price}"]`
    );
    if (favoriteButton) {
      favoriteButton.classList.add("selected");
    }
  });
}
