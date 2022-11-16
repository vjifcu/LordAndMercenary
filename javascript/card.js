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
        return document.createElement('div')
    }

}

