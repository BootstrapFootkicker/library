const mainContainer = document.querySelector('.main-container');
const addBookButton = document.querySelector('#addBook');
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

    displayBooks();
}

function clearDiv(div) {
    div.innerHTML = ""
}

function displayBooks() {
    clearDiv(mainContainer);
    for (let bookNumber in myLibrary) {
        let cardDiv = document.createElement("div");


        let tileDiv = document.createElement("div");
        let authorDiv = document.createElement("div");
        let pagesDiv = document.createElement("div");
        let readDiv = document.createElement("button");
        let removeButton = document.createElement("button")

        tileDiv.setAttribute('id', 'titleDiv' + bookNumber.toString());

        removeButton.textContent = "Remove";
        removeButton.setAttribute('id', 'removeButton' + bookNumber.toString());
        removeButton.addEventListener("click", removeBook);

        tileDiv.textContent = myLibrary[bookNumber].title;
        authorDiv.textContent = myLibrary[bookNumber].author;
        pagesDiv.textContent = myLibrary[bookNumber].pages;
        readDiv.textContent = myLibrary[bookNumber].read;

        cardDiv.classList.add('book-card');

        cardDiv.appendChild(tileDiv);
        cardDiv.appendChild(authorDiv);
        cardDiv.appendChild(pagesDiv);
        cardDiv.appendChild(readDiv);
        cardDiv.appendChild(removeButton);

        mainContainer.appendChild(cardDiv);

    }


}

function submit(event, title, author, pages, read) {
    if (read === true) {
        read = 'Read';
    } else {
        read = "Not Read";
    }
    addBookToLibrary(title, author, pages, read);
    event.preventDefault();


}


function removeBook() {
    let id = this.id.toString().slice(-1);
    let selector = '#titleDiv' + id;
    let bookName = document.querySelector(selector).textContent;
    let isTitle = (element) => element.title===bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    myLibrary.splice(bookIndex,1);
    displayBooks();

}


function createForm() {

    let formDiv = document.createElement('form');


    let titleDiv = document.createElement("input");
    titleDiv.setAttribute("type", "text")
    titleDiv.setAttribute("placeholder", "Title");


    let authorDiv = document.createElement("input");
    authorDiv.setAttribute("type", "text")
    authorDiv.setAttribute("placeholder", "Author");

    let pagesDiv = document.createElement("input");
    pagesDiv.setAttribute("type", "number")
    pagesDiv.setAttribute("placeholder", "Pages");

    let readLabel = document.createElement("label");
    readLabel.setAttribute('for', 'read');
    readLabel.appendChild(document.createTextNode("Have you read it?"))

    let readDiv = document.createElement("input");
    readDiv.setAttribute("type", "checkbox");
    readDiv.setAttribute("id", "read");


    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", 'submit')
    submitButton.addEventListener('click', () => submit('submit book', titleDiv.value,
        authorDiv.value, pagesDiv.value, document.querySelector('#read').checked));

    formDiv.classList.add('pop-up-form');
    formDiv.appendChild(titleDiv);
    formDiv.appendChild(authorDiv);
    formDiv.appendChild(pagesDiv);
    readLabel.appendChild(readDiv)
    formDiv.appendChild(readLabel)
    formDiv.appendChild(submitButton);


    return formDiv;

}

addBookButton.addEventListener('click', () => {
    let popUpDiv = createForm();
    mainContainer.appendChild(popUpDiv);
})


