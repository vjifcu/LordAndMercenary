import {VALUES, SUITS} from './commonTypes.js'

export var GLOBAL_DRAGGED_CARD = null;

export class Card {
    constructor(value, suit) {
        this.value = value
        this.suit = suit
    }

    get color() {
        return this.suit.color
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = `${this.value}${this.suit.VALUE}`
        cardDiv.classList.add("card", this.suit.COLOR, 'draggable')
        cardDiv.draggable = true

        cardDiv.addEventListener('dragstart', this.startDragging)
        cardDiv.addEventListener('dragend', this.endDragging)

        return cardDiv
    }

    startDragging(event) {
        this.classList.add('dragging')
        GLOBAL_DRAGGED_CARD = this
    }

    endDragging(event) {
        this.classList.remove('dragging')
        GLOBAL_DRAGGED_CARD = null
    }


}

