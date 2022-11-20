import {VALUES, SUITS} from './commonTypes.js'
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
        const afterCardElement = getDragAfterElement(this, event.clientX)
        if (GLOBAL_DRAGGED_CARD == null) {
            this.appendChild(GLOBAL_DRAGGED_CARD)
        } else {
            this.insertBefore(GLOBAL_DRAGGED_CARD, afterCardElement)
        }
        
    }

}

function getDragAfterElement(hand, x) {
    const otherCards = [...hand.querySelectorAll('.draggable:not(.dragging)')]

    return otherCards.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width/2
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
        
}

