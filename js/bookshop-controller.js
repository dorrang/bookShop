'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function(book) {
        return `
        <tr>
        <td><img class="card-img-top" src="img/${book.imgUrl}.png" alt="Card image cap"><p class="card-id">ID: ${book.id}</p></td>
            <td class="card-title">${book.name}</td>
            <td class="card-price">$${book.price}</td>
            <td> 
            <a href="#" onclick="onReadBook('${book.id}')">Read</a>
            <a href="#" onclick="onUpdateBook('${book.id}')">Update</a>
            <a href="#" class="delete-btn" onclick="onDeleteBook('${book.id}')">Delete</a>
            </td>
        </tr>
                         
        `
    });
    document.querySelector('.card-body').innerHTML = strHtmls.join('');
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Enter Book Name:');
    // var name = document.querySelector('.name-list').value;
    var price = +prompt('Enter Price:');
    price = price.toFixed(2);
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('New Price?');
    newPrice = newPrice.toFixed(2);
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h1').innerText = book.name;
    elModal.querySelector('.photo').innerHTML = `<img src="img/${book.imgUrl}.png"></img>`;
    elModal.querySelector('h2').innerText = '$' + book.price;
    elModal.hidden = false;
    elModal.querySelector('.rate-container').innerHTML = `<button class="decrease" onclick="onDecRate('${book.id}')">-</button>
    <span>${book.rate}</span>
    <button class="add" onclick="onAddRate('${book.id}')">+</button>`;

}

function onAddRate(bookId) {
    addRate(bookId);
    var book = getBookById(bookId);
    console.log(book);
    var elRate = document.querySelector('.rate-container');
    elRate.querySelector('span').innerText = book.rate;
}

function onDecRate(bookId) {
    decRate(bookId);
    var book = getBookById(bookId);
    console.log(book);
    var elRate = document.querySelector('.rate-container');
    elRate.querySelector('span').innerText = book.rate;
}



function onCloseModal() {
    document.querySelector('.modal').hidden = true
}


function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onPage(num) {
    goToPage(num);
    renderBooks();
}