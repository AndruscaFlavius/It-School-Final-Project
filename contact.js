//Cu aceasta linise de cod inregistram un eveniment(asteptam ca formularul sa fie completat)
document.addEventListener("DOMContentLoaded", function () {
  
//map
var mapOptions = {
  center: [45.77006557379909, 21.252267772023718],
  zoom: 15
}


var map = new L.map('map', mapOptions);


var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


map.addLayer(layer);
//-map

  const form = document.getElementById("abonareForm"); //am preluat elementul cu id"abonareForm"
  const mesajDiv = document.getElementById("mesaj"); //la fel si pe cel ci id"mesaj"
  let cart = sessionStorage.getItem("cart"); //aici am accesat valoarea din sessionStorage asociata lui "cart"
  cart = JSON.parse(cart);

  form.addEventListener("submit", function (event) {
    // am adaugat un eveniment pe butonul de submit
    event.preventDefault();
    //Aici sunt extrase valorile din campurile formularului
    const nume = document.getElementById("nume").value;
    const prenume = document.getElementById("prenume").value;
    const email = document.getElementById("email").value;
    const notificari = document.getElementById("notificari").checked;

    if (!/^[A-Za-z]+$/.test(nume) || !/^[A-Za-z]+$/.test(prenume)) {
       return;
    }

    if (!email.match(/[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/)) {
      
      return;
    }

    // Aici am salvat datele în Local Storage
    localStorage.setItem("nume", nume);
    localStorage.setItem("prenume", prenume);
    localStorage.setItem("email", email);
    localStorage.setItem("notificari", notificari);

    // Aici am folosit .reset pentru a reseta formularul dupa abonare 
    form.reset();
    mesajDiv.textContent = "Congratulations, you have successfully subscribed!";
  });
});

