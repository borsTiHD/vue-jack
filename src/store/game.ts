import { defineStore } from 'pinia'
import { useDeckStore } from '~/store/deck'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        gameEnded: false,
        dealer: {
            cards: []
        },
        player: {
            cards: [],
            stay: false
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
            if (this.canHit) {
                const deckStore = useDeckStore()
                this.player.cards.push(deckStore.flipCard(deckStore.takeCard()))
            }
        },
        stay() {
            this.player.stay = true

            // Flip every hidden card from dealer
            const deckStore = useDeckStore()
            this.dealer.cards.forEach((card) => {
                if (card.hidden) {
                    deckStore.flipCard(card)
                }
            })

            // Win/loose conditions
            this.gameEnded = true
        }
    },
    getters: {
        getDealerCards: (state) => state.dealer.cards,
        getPlayerCards: (state) => state.player.cards,
        getDealerSum() { return this.calculateDeckSum(this.getDealerCards) }, // Dealer's sum without hidden cards
        getDealerRealSum() { return this.calculateDeckSum(this.getDealerCards, false) }, // Dealer's real sum with all cards
        getPlayerSum() { return this.calculateDeckSum(this.getPlayerCards) },
        checkWin() {
            const dealerSum = this.getDealerSum
            const playerSum = this.getPlayerSum

            // Win/loose conditions
            if (playerSum > 21) {
                return {
                    win: false,
                    message: 'You Loose! You have more than 21!',
                    dealerSum,
                    playerSum
                }
            } else if (dealerSum > 21) {
                return {
                    win: true,
                    message: 'You win! Dealer has more than 21!',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum === dealerSum) {
                return {
                    win: false,
                    message: 'Tie! Both have the same sum!',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum > dealerSum) {
                return {
                    win: true,
                    message: 'You win! You have more than the dealer!',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum < dealerSum) {
                return {
                    win: false,
                    message: 'You Loose! You have less than the dealer!',
                    dealerSum,
                    playerSum
                }
            }
            return {
                win: false,
                message: 'Something went wrong!',
                dealerSum,
                playerSum
            }
        },
        canHit(state) {
            // If player has not stayed and has less than 21
            // Also allows the player (you) to draw while <= 21
            // Returns true/false
            return !state.player.stay && this.calculateDeckSum(state.player.cards) <= 21
        },
        reduceAces() {
            // Reduces aces if they are over 21
            // Calucaltes best possible sum of deck
            return (deck, sum) => {
                const deckStore = useDeckStore()
                const deckAces = deck.filter((card) => deckStore.checkAce(card)) // Get all aces
                let deckSum = sum // Calucalted sum of deck
                // As long as the sum is over 21 and there are aces, reduce the ace value and deck sum
                while (deckSum > 21 && Array.isArray(deckAces) && deckAces.length > 0) {
                    deckSum -= 10
                    deckAces.pop()
                }
                return deckSum
            }
        },
        calculateDeckSum() {
            // Calculates the sum of the given deck
            // If 'filterHiddenCards' is true (default), only cards with 'hidden = false' (visible) are considered
            return (deck, filterHiddenCards = true) => {
                if (!deck || !Array.isArray(deck) || deck.length === 0) return 0
                // Filters hidden cards from the deck if desired
                const filteredDeck = filterHiddenCards ? deck.filter((card) => !card.hidden) : deck
                const deckStore = useDeckStore()
                let sum = 0
                filteredDeck.forEach((card) => { sum += deckStore.getValue(card) })
                return sum <= 21 ? sum : this.reduceAces(filteredDeck, sum)
            }
        }
    }
})
