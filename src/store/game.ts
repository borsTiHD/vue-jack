import { defineStore } from 'pinia'
import { useDeckStore } from '~/store/deck'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        dealer: {
            cards: []
        },
        player: {
            cards: []
        }
    }),
    actions: {
        startGame() {
            // Resetting cards
            this.dealer.cards = []
            this.player.cards = []

            // Creating a Deck
            const deckStore = useDeckStore()
            deckStore.buildDeck() // Build deck
            Array.from({ length: 3 }, () => deckStore.shuffleDeck()) // Shuffle deck x times

            // Deal cards to the dealer until he have more than 17
            this.dealer.cards.push(deckStore.takeCard()) // Set first card hidden in store
            while (this.getDealerRealSum < 17) {
                this.dealer.cards.push(deckStore.flipCard(deckStore.takeCard())) // Add card to dealer's hand
            }

            // Deal two cards to the player
            Array.from({ length: 2 }, () => this.player.cards.push(deckStore.flipCard(deckStore.takeCard())))
        },
        hit() {
            const deckStore = useDeckStore()
            this.player.cards.push(deckStore.flipCard(deckStore.takeCard()))
        },
        stay() {
            console.log('Stay')
        }
    },
    getters: {
        getDealerCards: (state) => state.dealer.cards,
        getPlayerCards: (state) => state.player.cards,
        getDealerSum() { return this.calculateDeckSum(this.getDealerCards) },
        getDealerRealSum() { return this.calculateDeckSum(this.getDealerCards, false) },
        getPlayerSum() { return this.calculateDeckSum(this.getPlayerCards) },
        canHit(state) {
            // Allows the player (you) to draw while yourSum <= 21 - Returns true/false
            return this.calculateDeckSum(state.player.cards) <= 21
        },
        aceCount: () => {
            // Returns the number of aces in the given deck
            return (deck) => {
                if (!deck || !Array.isArray(deck) || deck.length === 0) return 0
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
        reduceAce: () => {
            // Reduces aces if they are over 21
            // TODO: Implement + make it dynamic with deck as an argument instead of using fix numbers
            return (playerSum, playerAceCount) => {
                while (playerSum > 21 && playerAceCount > 0) {
                    playerSum -= 10
                    playerAceCount -= 1
                }
                return playerSum
            }
        },
        calculateDeckSum: () => {
            // Calculates the sum of the given deck
            // If 'filterHiddenCards' is true (default), only cards with 'hidden = false' (visible) are considered
            return (deck, filterHiddenCards = true) => {
                if (!deck || !Array.isArray(deck) || deck.length === 0) return 0
                // Filters hidden cards from the deck if desired
                const filteredDeck = filterHiddenCards ? deck.filter((card) => !card.hidden) : deck
                const deckStore = useDeckStore()
                let sum = 0
                filteredDeck.forEach((card) => {
                    sum += deckStore.getValue(card)
                })
                return sum
            }
        }
    }
})
