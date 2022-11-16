import {VALUES, SUITS} from './commonTypes.js'
import { Card } from './card.js'

export class Hand {
    cards = []

    constructor(cards = []) {
        this.cards = cards
    }

    shuffle() {
        for (let i = this.numberOfCards-1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }

    draw(deck) {
        this.cards.push(deck.draw());
    }

    get numberOfCards() {
        return this.cards.length
    }

}

