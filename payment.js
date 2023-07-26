document.addEventListener("DOMContentLoaded", function () {
  let cart = localStorage.getItem("cart");//asa iau cosul din localStorage
  cart = JSON.parse(cart);
  displayCartDetails(cart);//afisez cosul
});

function displayCartDetails(cart) {
  // functie se ocupa cu afisarea produselor in pagina
  var cartDetailsElement = document.getElementById("cartDetails");
  var total = 0; //var pentru calcul
  var content = "";

  for (var i = 0; i < cart.length; i++) {// se parcurg produsele din cos 
    var item = cart[i];
    content +=
      "<p class='cart-item'>" +
      item.name +
      " - Lei" +
      item.price +
      " <button class='remove-button' onclick='removeFromCart(" +
      i +
      ")'>Remove</button></p>"; //continutul cosului nume+pret+total+butonul de stergere 
    total += item.price;
  }

  content += "<p class='cart-total'><strong>Total: Lei" + total + "</strong></p>";
  cartDetailsElement.innerHTML = content;

  var totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.innerHTML = "Total: Lei" + total;
}

function removeFromCart(index) {
  //functia care se ocupa cu stergerea din cos
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  cart.splice(index, 1);// stergem rpodusul
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartDetails(cart);
}

//finalizare
function finalizePayment() {
    //asa am obtin datele de la utilizator
  var cardNumber = document.getElementById("cardNumber").value;
  var ccv = document.getElementById("ccv").value;
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;

  var cardNumberRegex = /^[0-9]{10}$/;//am folosit regex pentru verificare
  var ccvRegex = /^[0-9]{3}$/;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo\.com|gmail\.com)$/;
  var nameRegex = /^[A-Za-z]{5,20}$/;

  if (!cardNumberRegex.test(cardNumber)) {
    alert("Introduceți un număr de card valid (10 cifre).");
    return;
  }

  if (!ccvRegex.test(ccv)) {
    alert("Introduceți un număr CCV valid (3 cifre).");
    return;
  }

  if (!nameRegex.test(name)) {
    alert("Introduceți un nume valid (5-20 caractere, fără numere).");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Introduceți o adresă de e-mail validă (yahoo.com sau gmail.com).");
    return;
  }

  //aici am salvat datele in local storage
  localStorage.setItem("cardNumber", cardNumber);
  localStorage.setItem("ccv", ccv);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  // Dacă toate detaliile sunt valide se afiseaza mesajul de mulțumire
  var successMessage = "Thank you for your order!";
  var messageContainer = document.getElementById("messageContainer");
  messageContainer.textContent = successMessage;

  // Pentru a sterge datele din câmpurile de completare după finalizarea plății
  document.getElementById("cardNumber").value = "";
  document.getElementById("ccv").value = "";
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
}
