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
    _updateBody(newElement)
    {
        this.html.querySelector("div.modal-body").append(newElement);
    }
    
    addImage(imageUrl)
    {
        let img = this.document.createElement("img")
        img.src = imageUrl
        this._updateBody(img)
    }
    addText(text)
    {
        let paragraph = this.document.createElement("p")
        paragraph.innerHTML = text
        this._updateBody(paragraph)
    }
    addFormField(fieldName, fieldType)
    {
        let newField = this.document.createElement("input")
        newField.setAttribute("type", fieldType);
        newField.setAttribute("id", fieldName);
        newField.setAttribute("class", "form-control");
        this._updateBody(newField)
    }
    addAction(actionDisplayName, actionId)
    {
        let newAction = this.document.createElement("button")
        newAction.innerHTML = actionDisplayName
        newAction.setAttribute("id", actionId)
        newAction.setAttribute("class", "btn btn-primary")
        newAction.setAttribute("data-bs-dismiss", "modal")
        this.html.querySelector("div.modal-footer").append(newAction);
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