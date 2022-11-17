import {VALUES, SUITS} from './commonTypes.js'
import { Card } from './card.js'

export class Hand {
    cards = []
    handElement = document.createElement('div')

    constructor(container, cards = []) {
        this.cards = cards

        //Construct Hand HTML element
        if (container === null)
            return

        this.handElement.classList.add("hand")
        container.appendChild(this.handElement)
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
        const drawnCard = deck.draw()
        this.cards.push(drawnCard)
        this.handElement.appendChild(drawnCard.getHTML())
    }

    get numberOfCards() {
        return this.cards.length
    }

}

