import { defineStore } from 'pinia'

export const useDeckStore = defineStore({
    id: 'deck-store',
    state: () => ({
        deck: []
    }),
    actions: {
        buildDeck() {
            this.deck = []

            // Card combinations:
            const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
            const types = ['C', 'D', 'H', 'S']

            // Create a deck of cards
            types.forEach((type) => {
                values.forEach((value) => {
                    this.deck.push({
                        value,
                        type,
                        name: `${value}-${type}` // A-C -> K-C, A-D -> K-D, etc.
                    })
                })
            })
        },
        shuffleDeck() {
            // Shuffle the deck
            this.deck.sort(() => Math.random() - 0.5)
        },
        takeCard() {
            // Take a card from the deck
            return this.deck.pop()
        }
    },
    getters: {
        getDeck: (state) => state.deck,
        getValue: () => {
            // Checks the value of the card and returns it as a number
            // Ace is returned as 11
            // Jack, Queen, and King are returned as 10
            return (card) => {
                if (isNaN(card.value)) {
                    if (card.value === 'A') {
                        return 11
                    }
                    return 10
                }
                return parseInt(card.value)
            }
        },
        checkAce: () => {
            // Checks if the card is an ace and returns true/false
            return (card) => {
                return card.value === 'A'
            }
        }
    }
})
