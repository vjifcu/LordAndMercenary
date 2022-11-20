import { GLOBAL_DRAGGED_CARD } from "./card.js"

export const SUITS = {
    SPADE: {
        VALUE: "♠",
        COLOR: 'black'
    },
    HEART: {
        VALUE: "♥",
        COLOR: 'red'
    },
    CLUB: {
        VALUE: "♣",
        COLOR: 'black'
    },
    DIAMOND: {
        VALUE: "♦",
        COLOR: 'red'
    }
}
export const VALUES = {
    ACE: "A",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
    JACK: "J",
    QUEEN: "Q",
    KING: "K"
}

export function executeCardDragging(field, event) {
    event.preventDefault()
    const afterCardElement = getDragAfterElement(field, event.clientX)
    if (GLOBAL_DRAGGED_CARD == null) {
        field.appendChild(GLOBAL_DRAGGED_CARD)
    } else {
        field.insertBefore(GLOBAL_DRAGGED_CARD, afterCardElement)
    }
    
}

function getDragAfterElement(hand, x) {
    const otherCards = [...hand.querySelectorAll('.draggable:not(.dragging)')]

    var output = ""
    var index = 0;

    const value = otherCards.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - (box.right)
        output += `i: ${index} offset: ${offset}\n`
        index += 1;
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
    
    console.log(output)
    return value
}
