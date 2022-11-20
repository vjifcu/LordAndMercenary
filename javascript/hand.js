import {VALUES, SUITS, executeCardDragging} from './commonTypes.js'
import { Card } from './card.js'
import { GLOBAL_DRAGGED_CARD } from './card.js'

const handlers = []
const battlefield = document.querySelector('.board .battlefield')

export class Hand {
    cards = []
    handElement = document.createElement('div')

    constructor(container, cards = []) {
        this.cards = cards

        //Construct Hand HTML element
        if (container === null)
            return

        this.handElement.classList.add("hand")
        this.handElement.addEventListener('dragover', this.dragOver)
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
        if (deck.numberOfCards <= 0)
            return

        const drawnCard = deck.draw()
        if (drawnCard == null)
            return

        this.cards.push(drawnCard)
        const drawnCardElement = drawnCard.getHTML();
        drawnCardElement.addEventListener('click', handlers[drawnCard] = this.playCard(drawnCard, this, battlefield), true)
        this.handElement.appendChild(drawnCardElement)
    }

    get numberOfCards() {
        return this.cards.length
    }

    playCard = function(card, hand, field) {
        return function playCardFunction(event) {
            const cardIndex = hand.cards.indexOf(card)
            hand.cards.splice(cardIndex, 1)

            hand.handElement.removeChild(this)

            field.appendChild(this)

            event.currentTarget.removeEventListener('click', handlers[card], true)
        }
    }

    dragOver(event) {
        executeCardDragging(this, event)
    }

}

