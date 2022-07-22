import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDeckStore } from '../../src/store/deck'

describe('Deck Store Tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Build Default Deck', async() => {
        const store = useDeckStore()
        const deckNumber = 52 // We are expecting a deck with 52 cards
        expect(store.getDeck).toHaveLength(0) // Check if deck is empty
        store.buildDeck()
        expect(store.getDeck).toHaveLength(deckNumber) // Check if deck is build
    })

    it('Shuffle Deck', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const currentDeck = store.getDeck.map((card) => card) // Copy unshuffeld deck
        store.shuffleDeck()
        const shuffledDeck = store.getDeck
        expect(currentDeck).not.toEqual(shuffledDeck) // Check if shuffled deck is not equal to the unshuffled deck
    })

    it('Take Card From Deck', async() => {
        const store = useDeckStore()
        store.buildDeck()
        store.shuffleDeck()
        const card = store.takeCard()
        expect(card).toBeTypeOf('object') // Check if card is an object
        expect(card).toHaveProperty('value') // Check if card has a value
        expect(card).toHaveProperty('type') // Check if card has a type
        expect(card).toHaveProperty('name') // Check if card has a name
        expect(card).toHaveProperty('hidden') // Check if card has a hidden property
    })
})
