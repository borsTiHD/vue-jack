import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDeckStore } from '../../src/store/deck'

describe('Deck store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('build default deck', async() => {
        const store = useDeckStore()
        const deckNumber = 52 // We are expecting a deck with 52 cards
        expect(store.getDeck).toHaveLength(0) // Check if deck is empty
        store.buildDeck()
        expect(store.getDeck).toHaveLength(deckNumber) // Check if deck is build
    })

    it('shuffle deck', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const currentDeck = store.getDeck.map((card) => card) // Copy unshuffeld deck
        store.shuffleDeck()
        const shuffledDeck = store.getDeck
        expect(currentDeck).not.toEqual(shuffledDeck) // Check if shuffled deck is not equal to the unshuffled deck
    })

    it('take card from deck', async() => {
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

    it('flip/hide a card', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const card = store.takeCard()
        expect(card.hidden).toBeTruthy() // Check if card is hidden
        store.flipCard(card)
        expect(card.hidden).toBeFalsy() // Check if card is not hidden
        store.hideCard(card)
        expect(card.hidden).toBeTruthy() // Check if card is hidden
    })

    it('check card value', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const card = store.takeCard()
        expect(['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']).toContain(card.value) // Check if card value is one of the starter values

        // Check getValue()
        const cardValue = store.getValue(card)
        expect(cardValue).toBeTypeOf('number') // Check if card value is a number
        expect(cardValue).toBeGreaterThanOrEqual(1) // Check if card value is greater than or equal to 1
        expect(cardValue).toBeLessThanOrEqual(11) // Check if card value is less than or equal to 11
    })

    it('check card type', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const card = store.takeCard()
        expect(card.type).toBeTypeOf('string') // Check if card type is a string
        expect(['C', 'D', 'H', 'S']).toContain(card.type) // Check if card type is one of the four types
    })

    it('check card name', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const card = store.takeCard()
        expect(card.name).toBeTypeOf('string') // Check if card name is a string
        expect(card.name).toMatch(/^[A-K]-[CDHS]$/) // Check if card name is in the format of A-C, A-D, A-H, A-S, etc.
    })

    it('check ace', async() => {
        const store = useDeckStore()
        store.buildDeck()
        const card = {
            value: 'A',
            type: 'C',
            name: 'A-C',
            hidden: true
        }
        expect(store.checkAce(card)).toBeTruthy()
    })
})
