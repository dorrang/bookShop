'use strict'
const KEY = 'books';
var gBooks;

const  PAGE_SIZE  = 5;
var  gPageIdx  = 0;

_createBooks();

function getBooks() {
    var  startIdx  =  gPageIdx * PAGE_SIZE;    
    return  gBooks.slice(startIdx,  startIdx  +  PAGE_SIZE)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE < 0) {
        gPageIdx = ((gBooks.length - 1) / PAGE_SIZE);
    }
}

function goToPage(num) {
    gPageIdx = num;
}


function addRate(bookId) {
    var book = getBookById(bookId);
    book.rate++
        if (book.rate > 10) book.rate = 10;;
    _saveBooksToStorage();
}

function decRate(bookId) {
    var book = getBookById(bookId);
    book.rate--
        if (book.rate < 0) book.rate = 0;;
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
            return bookId === book.id
        })
        // if(bookIdx === -1) return;
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function(book) {
            return book.id === bookId;
        })
        // var book = getBookById(bookId)
    book.price = newPrice;
    _saveBooksToStorage();
}

function _createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: getRandomIntInclusive(0, 7),
        rate: 0
    };
}

function _createBooks() {
    var books = loadFromStorage(KEY)

    if (!books || !books.length) {
        books = [{
                id: makeId(),
                name: 'Syntax-Poetry',
                price: 67,
                imgUrl: getRandomIntInclusive(0, 6),
                rate: 0
            },
            {
                id: makeId(),
                name: 'Other Ways',
                price: 44,
                imgUrl: getRandomIntInclusive(0, 6),
                rate: 0
            },
            {
                id: makeId(),
                name: 'I. am. Tiger.',
                price: 18,
                imgUrl: getRandomIntInclusive(0, 6),
                rate: 0
            }, {
                id: makeId(),
                name: 'That\'s not my name',
                price: 109,
                imgUrl: getRandomIntInclusive(0, 6),
                rate: 0
            }, {
                id: makeId(),
                name: 'Water under the Regex',
                price: 666,
                imgUrl: getRandomIntInclusive(0, 6),
                rate: 9
            }
        ];
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}