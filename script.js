const mainContainer = document.querySelector('.main-container');
const addBookButton = document.querySelector('#addBook');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('.pop-up-form');
const formSubmitButton = document.querySelector('#formSubmitButton');
const titleDiv = document.querySelector('#formTitle');
const authorDiv = document.querySelector('#formAuthor');
const pagesDiv = document.querySelector('#formPages');
const readDiv = document.querySelector('#formRead');


let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return (`${this.title} by ${this.author}, ${this.pages}. pages read = ${this.read}`);
}

function bookExists(title) {
    let doesExist;
    for (let bookNumber in myLibrary) {
        doesExist = (myLibrary[bookNumber].title === title);
        if (doesExist === true) {

            return doesExist;
        }
    }
}

function addBookToLibrary(title, author, pages, read) {

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    let bookDiv = createBookCard(title, author, pages, read);
    mainContainer.appendChild(bookDiv);
}


function createBookCard(title, author, pages, read) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute('id', title + 'Card');


    let tileDiv = document.createElement("div");
    let authorDiv = document.createElement("div");
    let pagesDiv = document.createElement("div");
    let readDiv = document.createElement("button");
    let removeButton = document.createElement("button")

    tileDiv.setAttribute('id', title + 'titleDiv');

    removeButton.textContent = "Remove";
    removeButton.setAttribute('id', title + 'removeButton');
    removeButton.addEventListener("click", removeBook);

    readDiv.setAttribute('id', title + 'toggleRead');
    readDiv.addEventListener("click", ChangeReadStatus);

    tileDiv.textContent = title
    authorDiv.textContent = author;
    pagesDiv.textContent = pages;
    readDiv.textContent = read;

    cardDiv.classList.add('book-card');

    cardDiv.appendChild(tileDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(readDiv);
    cardDiv.appendChild(removeButton);
    return cardDiv;
}


function ChangeReadStatus() {
    let id = this.id.toString().substring(0, this.id.toString().length - 10);
    console.log(id);
    let selector = '#' + id;
    console.log(selector);
    let readButton = document.querySelector(selector + 'toggleRead');
    let bookName = document.querySelector(selector + 'titleDiv').textContent;
    let isTitle = (element) => element.title === bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    if (myLibrary[bookIndex].read === 'Read') {
        myLibrary[bookIndex].read = "Not Read"
        readButton.textContent = "Not Read"
        console.log(myLibrary);

    } else {
        myLibrary[bookIndex].read = "Read";
        readButton.textContent = "Read"
        console.log(myLibrary);
    }

}

function removeBook() {
    let id = this.id.toString().substring(0, this.id.toString().length - 12);
    let selector = '#' + id;
    let cardDiv = document.querySelector(selector + 'Card');
    let bookName = document.querySelector(selector + 'titleDiv').textContent;
    let isTitle = (element) => element.title === bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    cardDiv.remove();
    myLibrary.splice(bookIndex, 1);
    console.log(myLibrary)


}


addBookButton.addEventListener('click', () => {
    if (form == null) return;
    overlay.classList.add('active');
    form.classList.add('active');


})

overlay.addEventListener('click', () => {
    if (form == null) return;
    overlay.classList.remove('active');
    form.classList.remove('active');
})


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let read
    if (readDiv.value === true) {
        read = 'Read';
    } else {
        read = "Not Read";
    }
    if (bookExists(titleDiv.value) === true) {
        alert(titleDiv.value + " is book already in library!")
        return;
    }
    addBookToLibrary(titleDiv.value, authorDiv.value, pagesDiv.value, read);

    overlay.classList.remove('active');
    form.classList.remove('active');


})