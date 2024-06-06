var tuttiLibri = [];
var carrello = [];

/* This code snippet is making a GET request to the "https://striveschool-api.herokuapp.com/books"
endpoint to fetch a list of books. */
fetch("https://striveschool-api.herokuapp.com/books")
    .then((Response) => Response.json())
    .then((pippo) => {
        tuttiLibri = pippo;
        mostraLibri(tuttiLibri);
    });

/**
 * The function `mostraLibri` takes an array of book objects, generates HTML cards for each book with
 * options to add to cart and view details, and displays them on the webpage.
 * @param {Array} libriArray - An array containing objects representing books. Each object should have
 * properties like `img` (image URL), `title` (book title), `price` (book price), and `asin` (unique
 * identifier for the book).
 */
function mostraLibri(libriArray) {
    let row = "";
    libriArray.forEach((element, index) => {
        let cardClass = inCarrello(element) ? 'card border-success' : 'card';
        let contenitore = "";

        contenitore += "<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>";
        contenitore += `<div class='${cardClass} h-100'>`;
        contenitore += "<img src='" + element.img + "' class='card-img-top img-fluid'/>";
        contenitore += "<div class='card-body'>";
        contenitore += "<h5 class='card-title'>" + element.title + "</h5>";
        contenitore += "<p class='card-price'>€ " + element.price + "</p>";
        contenitore += "<a href='#' class='btn btn-success' onclick='aggiungiAlCarrello(" + index + ")'>Add to cart</a>";
       contenitore += "<button type='button' class='btn btn-light' onclick='saltaLibro(" + index + ")'>Skip</button>";
        contenitore += "<a href='details.html?asin=" + element.asin + "' class='btn btn-warning'>Details</a>";
        contenitore += "</div>";
        contenitore += "</div>";
        contenitore += "</div>";

        row += contenitore;
    });

    let libriDiv = document.querySelector(".libri");
    libriDiv.innerHTML = row;
   
}


  

/**
 * The function adds a book to the cart if it's not already in the cart and then updates the cart and
 * displays all books.
 * @param index - The `index` parameter in the `aggiungiAlCarrello` function represents the index of
 * the book in the `tuttiLibri` array that you want to add to the shopping cart (`carrello`). By using
 * this index, the function retrieves the book object from the `tut
 */
function aggiungiAlCarrello(index) {
    let libro = tuttiLibri[index]
    if (!inCarrello(libro)) {
        carrello.push(libro)
    }
    aggiornaCarrello()
    mostraLibri(tuttiLibri)
}

/**
 * The function aggiornaCarrello updates the content of the shopping cart on a webpage by dynamically
 * generating HTML elements for each item in the cart.
 */
function aggiornaCarrello() {
    let carrelloDiv = document.querySelector(".carrello")
    carrelloDiv.innerHTML = ""

    carrello.forEach((libro, index) => {
        let contenitore = ""

        contenitore += "<div class='card mb-3'>"
        contenitore += "<div class='row g-0'>"
        contenitore += "<div class='col-md-4'>"
        contenitore += "<img src='" + libro.img + "' class='img-fluid rounded-start'/>"
        contenitore += "</div>"
        contenitore += "<div class='col-md-8'>"
        contenitore += "<div class='card-body'>"
        contenitore += "<h5 class='card-title'>" + libro.title + "</h5>"
        contenitore += "<p class='card-price'>€ " + libro.price + "</p>"
        contenitore += `<button class='btn btn-danger btn-sm' onclick='rimuoviDalCarrello("${libro.asin}")'>Remove</button>`
        contenitore += "</div>"
        contenitore += "</div>"
        contenitore += "</div>"
        contenitore += "</div>"

        carrelloDiv.innerHTML += contenitore
    })

    contaElementiCarrello()
    totaleCarrello()
}

/**
 * The function "inCarrello" checks if a book is already in the shopping cart based on its unique
 * identifier (ASIN).
 * @param libro - The `libro` parameter represents a book object that you want to check if it is
 * already in the shopping cart (`carrello`). The function `inCarrello` uses the `some` method to
 * iterate over the items in the `carrello` array and checks if any item in the cart
 * @returns The function `inCarrello` is returning a boolean value. It checks if there is any item in
 * the `carrello` array (presumably containing items in a shopping cart) that has the same `asin` value
 * as the `asin` value of the `libro` object passed as an argument. If such an item is found, the
 * function returns `true`, indicating that the book
 */
function inCarrello(libro) {
    return carrello.some(item => item.asin === libro.asin)
}

/**
 * The function `svuotaCarrello` empties the shopping cart, updates it, and displays all books.
 */
function svuotaCarrello() {
    carrello = []
    aggiornaCarrello()
    mostraLibri(tuttiLibri)
    
}

/**
 * The function counts the number of items in a shopping cart and updates the display accordingly.
 */
function contaElementiCarrello() {
    let numElementi = carrello.length
    let numElementiDiv = document.getElementById("numElementiCarrello")
    numElementiDiv.innerHTML = "Items in cart: " + numElementi

    let cartIcon = document.querySelector(".bi-cart2")
    cartIcon.setAttribute("data-count", numElementi)
}

/**
 * The function removes a book from the shopping cart based on its ASIN and then updates the cart and
 * displays all books.
 * @param asin - The `asin` parameter in the `rimuoviDalCarrello` function is used to identify the book
 * that needs to be removed from the shopping cart (`carrello`). The function filters out the book with
 * the matching ASIN (Amazon Standard Identification Number) from the `carrello` array,
 */
function rimuoviDalCarrello(asin) {
    carrello = carrello.filter(libro => libro.asin !== asin)
    aggiornaCarrello()
    mostraLibri(tuttiLibri)
}

/**
 * The function `filtraLibri` filters a list of books based on a search input and displays the filtered
 * books.
 */

function filtraLibri() {
    let valoreRicerca = document.getElementById("ricerca").value.toUpperCase()
    let libriFiltrati = tuttiLibri.filter(libro => libro.title.toUpperCase().includes(valoreRicerca))
    mostraLibri(libriFiltrati)
}
/**
 * The function calculates the total price of items in a shopping cart and displays it on the webpage.
 */
function totaleCarrello(){
    let totale = 0
    carrello.forEach((element) => {
        totale += element.price
    })
    document.getElementById("totaleCarrello").innerHTML = "Total: " + totale + "€"
}

/**
 * The function `saltaLibro` skips a book and removes it from the list of displayed books.
 * @param {number} index - The index of the book to be skipped in the `tuttiLibri` array.
 */
function saltaLibro(index) {
    // Rimuove il libro dalla lista dei libri mostrati
    tuttiLibri.splice(index, 1);
    // Aggiorna la visualizzazione dei libri
    mostraLibri(tuttiLibri);
    // Aggiorna il carrello dopo aver saltato il libro
    aggiornaCarrello();
}
