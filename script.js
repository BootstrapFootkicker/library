const mainContainer = document.querySelector('.main-container');
const addBookButton = document.querySelector('#addBook');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('.pop-up-form');
const formSubmitButton = document.querySelector('#submitButton');
const titleDiv = document.querySelector('#title');
const authorDiv = document.querySelector('#author');
const pagesDiv = document.querySelector('#pages');
const readDiv = document.querySelector('#read');


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

function addBookToLibrary(title, author, pages, read) {

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    let bookDiv = createBookCard(title, author, pages, read);
    mainContainer.appendChild(bookDiv);
}

function clearDiv(div) {
    div.innerHTML = ""
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

function submit(title, author, pages, read) {
    if (read === true) {
        read = 'Read';
    } else {
        read = "Not Read";
    }
    addBookToLibrary(title, author, pages, read);
    console.log(event)
    overlay.classList.remove('active');
    form.classList.remove('active');


}

function ChangeReadStatus() {
    let id = this.id.toString().slice(-1);
    let selector = '#titleDiv' + id;
    let bookName = document.querySelector(selector).textContent;
    let isTitle = (element) => element.title === bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    if (myLibrary[bookIndex].read === 'Read') {
        myLibrary[bookIndex].read = "Not Read"
    } else {
        myLibrary[bookIndex].read = "Read";
    }
    //  displayBooks();
}

function removeBook() {
    let id = this.id.toString().slice(-1);
    let selector = '#titleDiv' + id;
    let bookName = document.querySelector(selector).textContent;
    let isTitle = (element) => element.title === bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    myLibrary.splice(bookIndex, 1);
//    displayBooks();

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


formSubmitButton.addEventListener('click', function (e) {
    submit(titleDiv.value, authorDiv.value, pagesDiv.value, document.querySelector('#read').checked);
    e.preventDefault();
})