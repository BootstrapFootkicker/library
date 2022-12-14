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

    displayBooks();
}

function clearDiv(div) {
    div.innerHTML = ""
}


// function createForm() {
//
//     let formDiv = document.createElement('form');
//     formDiv.setAttribute('id','formDiv')
//
//     let divContents=document.createElement('div');
//
//
//     let titleDiv = document.createElement("input");
//     titleDiv.setAttribute("type", "text")
//     titleDiv.setAttribute("placeholder", "Title");
//
//
//     let authorDiv = document.createElement("input");
//     authorDiv.setAttribute("type", "text")
//     authorDiv.setAttribute("placeholder", "Author");
//
//     let pagesDiv = document.createElement("input");
//     pagesDiv.setAttribute("type", "number")
//     pagesDiv.setAttribute("placeholder", "Pages");
//
//     let readLabel = document.createElement("label");
//     readLabel.setAttribute('for', 'read');
//     readLabel.appendChild(document.createTextNode("Have you read it?"))
//
//     let readDiv = document.createElement("input");
//     readDiv.setAttribute("type", "checkbox");
//     readDiv.setAttribute("id", "read");
//
//
//     let submitButton = document.createElement("input");
//     submitButton.setAttribute("type", "submit");
//     submitButton.setAttribute("id", 'submit')
//     submitButton.addEventListener('click', () => submit('submit book', titleDiv.value,
//         authorDiv.value, pagesDiv.value, document.querySelector('#read').checked));
//
//     divContents.classList.add('pop-up-form');
//     divContents.appendChild(titleDiv);
//     divContents.appendChild(authorDiv);
//     divContents.appendChild(pagesDiv);
//     readLabel.appendChild(readDiv)
//     divContents.appendChild(readLabel)
//     divContents.appendChild(submitButton);
//     formDiv.appendChild(divContents);
//
//
//     return formDiv;
//
// }

function displayBooks() {

    for (let bookNumber in myLibrary) {

        let cardDiv = document.createElement("div");
        cardDiv.setAttribute('id', 'cardDiv' + bookNumber.toString());


        let tileDiv = document.createElement("div");
        let authorDiv = document.createElement("div");
        let pagesDiv = document.createElement("div");
        let readDiv = document.createElement("button");
        let removeButton = document.createElement("button")

        tileDiv.setAttribute('id', 'titleDiv' + bookNumber.toString());

        removeButton.textContent = "Remove";
        removeButton.setAttribute('id', 'removeButton' + bookNumber.toString());
        removeButton.addEventListener("click", removeBook);

        readDiv.setAttribute('id', 'toggleRead' + bookNumber.toString());
        readDiv.addEventListener("click", ChangeReadStatus);

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
    displayBooks();
}

function removeBook() {
    let id = this.id.toString().slice(-1);
    let selector = '#titleDiv' + id;
    let bookName = document.querySelector(selector).textContent;
    let isTitle = (element) => element.title === bookName;
    let bookIndex = myLibrary.findIndex(isTitle);
    myLibrary.splice(bookIndex, 1);
    displayBooks();

}


addBookButton.addEventListener('click', () => {
    // let popUpDiv = createForm();
    // mainContainer.appendChild(popUpDiv);
    // addBookButton.disabled=true;
    if (form == null) return;
    overlay.classList.add('active');
    form.classList.add('active');


})

overlay.addEventListener('click', () => {
    if (form == null) return;
    overlay.classList.remove('active');
    form.classList.remove('active');
})


// formSubmitButton.addEventListener('click', () => {
//     submit('submit book', titleDiv.value,
//         authorDiv.value, pagesDiv.value, document.querySelector('#read').checked)
//
// });

formSubmitButton.addEventListener('click', function (e) {
    submit(titleDiv.value, authorDiv.value, pagesDiv.value, document.querySelector('#read').checked);
    e.preventDefault();
})