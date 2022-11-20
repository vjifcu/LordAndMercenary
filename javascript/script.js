import { Deck } from "./deck.js";
import { Hand } from "./hand.js";

const deck = new Deck(document.querySelector('.draw-deck-container'))
deck.shuffle()

const hand = new Hand(document.querySelector('.hand-container.local'))
const remoteHand = new Hand(document.querySelector('.hand-container.remote'))

const deckElement = document.querySelector('.draw-deck')
deck.deckElement.addEventListener('click', () => {
    hand.draw(deck)
})
