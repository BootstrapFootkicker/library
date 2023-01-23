const mainContainer = document.querySelector('.main-container');
const addBookButton = document.querySelector('#addBook');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('.pop-up-form');
const formSubmitButton = document.querySelector('#formSubmitButton');
const titleDiv = document.querySelector('#formTitle');
const authorDiv = document.querySelector('#formAuthor');
const pagesDiv = document.querySelector('#formPages');
const readDiv = document.querySelector('#formRead');


class Library {
    constructor() {
        this.myLibrary = [];
    }

    get library(){
        return this.myLibrary;
    }
    bookExists(title) {
        let doesExist;
        for (let bookNumber in this.myLibrary) {
            doesExist = (this.myLibrary[bookNumber].title === title);
            if (doesExist === true) {

                return doesExist;
            }
        }

    }


    createBookCard(title, author, pages, read) {
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute('id', title + 'Card');


        let tileDiv = document.createElement("div");
        let authorDiv = document.createElement("div");
        let pagesDiv = document.createElement("div");

        let buttonGroup = document.createElement("div");
        buttonGroup.setAttribute('id', title + 'ButtonGroup')
        buttonGroup.classList.add('button-group')

        let readDiv = document.createElement("button");
        let removeButton = document.createElement("button")

        tileDiv.setAttribute('id', title + 'titleDiv');

        removeButton.textContent = "Remove";
        removeButton.setAttribute('id', title + 'removeButton');
        removeButton.addEventListener("click", ()=> this.removeBook((title + 'removeButton')));

        readDiv.setAttribute('id', title + 'toggleRead');
        readDiv.addEventListener("click",()=> this.ChangeReadStatus((title+'ButtonGroup')));

        if (read === 'Read') {
            readDiv.classList.add('read')
        } else {
            readDiv.classList.add('notRead')
        }

        tileDiv.textContent = title
        authorDiv.textContent = author;
        pagesDiv.textContent = pages;
        readDiv.textContent = read;

        cardDiv.classList.add('book-card');

        cardDiv.appendChild(tileDiv);
        cardDiv.appendChild(authorDiv);
        cardDiv.appendChild(pagesDiv);

        buttonGroup.appendChild(readDiv);
        buttonGroup.appendChild(removeButton);

        cardDiv.appendChild(buttonGroup);

        return cardDiv;
    }

    addBookToLibrary(title, author, pages, read) {

        let book = new Book(title, author, pages, read);
        this.myLibrary.push(book);
        let bookDiv = this.createBookCard(title, author, pages, read);
        mainContainer.appendChild(bookDiv);
    }


    ChangeReadStatus(id) {
        let newId = id.toString().substring(0, id.toString().length - 11);
        console.log(newId);
        let selector = '#' + newId;
        console.log(selector);
        let readButton = document.querySelector(selector + 'toggleRead');
        let bookName = document.querySelector(selector + 'titleDiv').textContent;
           console.log(bookName);
        let isTitle = (element) => element.title === bookName;
        let bookIndex = this.myLibrary.findIndex(isTitle);

        if (this.myLibrary[bookIndex].read === 'Read') {
            this.myLibrary[bookIndex].read = "Not Read"
            readButton.textContent = "Not Read"
            readButton.classList.remove('read')
            readButton.classList.add('notRead')
            console.log(this.myLibrary);

        } else {
            this.myLibrary[bookIndex].read = "Read";
            readButton.textContent = "Read"
            readButton.classList.remove('notRead')
            readButton.classList.add('read')
            console.log(this.myLibrary);
        }

    }

    removeBook(id) {
        let newId = id.toString().substring(0, id.toString().length - 12);
        let selector = '#' + newId;
        let cardDiv = document.querySelector(selector + 'Card');
        let bookName = document.querySelector(selector + 'titleDiv').textContent;
        let isTitle = (element) => element.title === bookName;
        let bookIndex = this.myLibrary.findIndex(isTitle);
        cardDiv.remove();
        this.myLibrary.splice(bookIndex, 1);
        console.log(this.myLibrary)


    }
}

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get book() {
        return (`${this.title} by ${this.author}, ${this.pages}. pages read = ${this.read}`);
    }

}


let L= new Library()


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
    if (readDiv.checked === true) {
        read = 'Read';
    } else {
        read = "Not Read";
    }
    if (L.bookExists(titleDiv.value,L.myLibrary) === true) {
        alert(titleDiv.value + " is book already in library!")
        return;
    }
    console.log(read);
    L.addBookToLibrary(titleDiv.value, authorDiv.value, pagesDiv.value, read);
    console.log(L.library);
    overlay.classList.remove('active');
    form.classList.remove('active');


})