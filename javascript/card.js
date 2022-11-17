import {VALUES, SUITS} from './commonTypes.js'

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
        cardDiv.classList.add("card", this.suit.COLOR)
        return cardDiv
    }

}

