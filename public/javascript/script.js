import { Deck } from "./deck.js";
import { Hand } from "./hand.js";

let gameMode = "";
let playerNum = 0;
let localReady = false;
let remoteReady = [];

const socket = io();

socket.on('player-number', playerNumber => {
    if (playerNumber == -1) {
        console.log('No player slots available')
    } else {
        playerNum = parseInt(playerNumber)
        
        console.log(`Joined as player ${playerNum}`)
    }
})

const deck = new Deck(document.querySelector('.draw-deck-container'))
deck.shuffle()

const hand = new Hand(document.querySelector('.hand-container.local'))
const remoteHand = new Hand(document.querySelector('.hand-container.remote'))

const deckElement = document.querySelector('.draw-deck')
deck.deckElement.addEventListener('click', () => {
    hand.draw(deck)
})
