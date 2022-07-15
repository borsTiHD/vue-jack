import { defineStore } from 'pinia'
import { useDeckStore } from '~/store/deck'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        dealer: {
            hidden: [], // Keeps track of hidden card
            cards: []
        },
        player: {
            cards: []
        }
    }),
    actions: {
        startGame() {
            this.$reset() // Resetting the game

            // Creating a Deck
            const deckStore = useDeckStore()
            deckStore.$reset()
            deckStore.buildDeck() // Build deck
            Array.from({ length: 3 }, () => deckStore.shuffleDeck()) // Shuffle deck x times
            console.log('Generated deck:', deckStore.getDeck)

            // Deal cards to the dealer
            this.dealer.hidden = deckStore.takeCard() // Set hidden card in store

            console.log('Dealer card 1:', this.dealer.hidden)
            console.log('Dealer sum:', this.calculateDeckSum([...this.dealer.hidden, ...this.dealer.cards]))
        },
        hit() {
            console.log('Hit')
        },
        stay() {
            console.log('Stay')
        }
    },
    getters: {
        getDealerHidden: (state) => state.dealer.hidden,
        getDealerCards: (state) => state.dealer.cards,
        getPlayerCards: (state) => state.player.cards,
        canHit(state) {
            // Allows the player (you) to draw while yourSum <= 21 - Returns true/false
            return this.calculateDeckSum(state.player.cards) <= 21
        },
        aceCount: () => {
            // Returns the number of aces in the given deck
            return (deck) => {
                const deckStore = useDeckStore()
                let count = 0
                deck.forEach((card) => {
                    if (deckStore.checkAce(card)) {
                        count++
                    }
                })
                return count
            }
        },
        calculateDeckSum: () => {
            // Calculates the sum of the given deck
            return (deck) => {
                const deckStore = useDeckStore()
                let sum = 0
                deck.forEach((card) => {
                    sum += deckStore.getValue(card)
                })
                return sum
            }
        }
    }
})
