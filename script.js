
function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

Book.prototype.info= function (){
    return(`${this.title} by ${this.author}, ${this.pages}. pages read = ${this.read}`);
}

trashBook= new Book('its a me','mario',55,true);


console.log(trashBook.info());