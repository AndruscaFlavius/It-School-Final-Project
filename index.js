//Carousel
$("#recipeCarousel").carousel({
  interval: 20000,
});

$(".carousel .carousel-item").each(function () {
  var minPerSlide = 3;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }

    next.children(":first-child").clone().appendTo($(this));
  }
});

var cart = []; //Acesta e folosit pentru a stoca produsele adaugate in cos

function addToCart(productName, price) {
  //aceasta functie primeste argumentele, acestea sunt adaugate in cos sub forma de obiect
  cart.push({ name: productName, price: price });
  updateCart();//actualizam continutul
}

function updateCart() {
  //functia care afiseaza produsele in cos
  var cartItemsElement = document.getElementById("cartItems");
  var total = 0; //am initializat var total pentru a calcula suma produselor din cos
  var content = "";

  //cu for se parcurg produsele din cos 
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    content +=
      "<p>" +
      item.name +
      " - Lei" +
      item.price +
      " <button onclick='removeFromCart(" +
      i +
      ")'>Șterge</button></p>";
    total += item.price;
  }
//adaugam si totalul produselor din cos
  content += "<p><strong>Total: Lei" + total + "</strong></p>";
  cartItemsElement.innerHTML = content;
//aici actualizez pretul total
  var totalAmountElement = document.getElementById("totalAmount");
  totalAmountElement.innerHTML = "Total: Lei" + total;
}
//aceasta functie are rolul de a elimina produsele din cos
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
