import {VALUES, SUITS} from './commonTypes.js'
import { Card } from './card.js'

export class Deck {
    cards = []
    deckElement = document.createElement('div')

    constructor(container, cards = freshDeck()) {
        this.cards = cards

        //Construct Deck HTML element
        if (container === null)
            return
        
        this.deckElement.classList.add('deck')
        this.deckElement.innerText = this.numberOfCards
        container.appendChild(this.deckElement)
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
        if (this.numberOfCards <= 0)
            return null
            
        this.deckElement.innerText = this.numberOfCards-1
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
