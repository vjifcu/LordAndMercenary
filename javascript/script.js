import { Deck } from "./deck.js";
import { Hand } from "./hand.js";

const deck = new Deck()
deck.shuffle()

const hand = new Hand()

hand.draw(deck)
