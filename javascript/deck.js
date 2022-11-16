import {VALUES, SUITS} from './commonTypes.js'
import { Card } from './card.js'

export class Deck {
    cards = []

    constructor(cards = freshDeck()) {
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

    draw() {
        return this.cards.shift();
    }

    get numberOfCards() {
        return this.cards.length
    }

}

function freshDeck() {
    return Object.values(SUITS).flatMap(suit => {
        return Object.values(VALUES).flatMap(cardValue => {
            return new Card(cardValue, suit)
        })
    })
}
