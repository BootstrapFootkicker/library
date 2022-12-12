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

function addBookToLibrary() {
    let title = prompt("What is the title of your book?");
    let author = prompt("Who is the author of this book?");
    let pages = prompt('How many pages does this book have?');
    let read = prompt("Did you already read this book?").toLowerCase();

    read = read === "yes";
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);
}


addBookToLibrary()