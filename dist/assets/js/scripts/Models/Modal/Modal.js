import MODAL_TEMPLATE from './modal_template.js'

class Modal
{
    constructor(document, destination, title)
    {
        let Parser = new DOMParser()
        this.html = Parser.parseFromString(MODAL_TEMPLATE, 'text/html').querySelector('body')
        /*
        Args : 
        - document : describe the destination file, used as document.getElementById
        - destination : container id underlying the document args to insert the modal into the page
        - title : modal's title
        */
        this.document = document;
        this.destination = destination;
        this.title = title;
        this.html.querySelector('.modal-title').innerHTML = this.title
    }
    addImage(imageUrl)
    {
        let img = this.document.createElement("img")
        img.src = imageUrl
        this.html.querySelector("div.modal-body").append(img)
    }
    addText(text)
    {
        let paragraph = this.document.createElement("p")
        paragraph.innerHTML = text
        this.html.querySelector("div.modal-body").append(paragraph)
    }
    updateId(newId)
    {
        this.html.querySelector('div').setAttribute("id", newId)
    }
    display()
    {
        this.document.getElementById(this.destination).append(this.html.querySelector("div"))
    }
}

export default Modal;