import { defineStore } from 'pinia'
import { useDeckStore } from '~/store/deck'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        running: false,
        results: false,
        dealer: {
            cards: []
        },
        player: {
            bet: 0,
            cards: [],
            stay: false
        }
    }),
    actions: {
        newGame() {
            // Resetting the game
            this.dealer.cards = []
            this.player.cards = []
            this.player.stay = false
            this.running = false
            this.results = false
        },
        startGame() {
            // Starting the game
            this.running = true

            // Creating a Deck
            const deckStore = useDeckStore()
            deckStore.buildDeck() // Build deck
            Array.from({ length: 3 }, () => deckStore.shuffleDeck()) // Shuffle deck x times

            // Deal two cards to the player
            this.player.cards.push(deckStore.flipCard(deckStore.takeCard()))
            this.player.cards.push(deckStore.flipCard(deckStore.takeCard()))

            // Deal two cards to the dealer
            this.dealer.cards.push(deckStore.takeCard()) // Set first card hidden in store
            this.dealer.cards.push(deckStore.flipCard(deckStore.takeCard())) // Set second card visible in store

            // Checks if player has blackjack
            if (this.getPlayerSum === 21) {
                this.stay()
            }
        },
        setBet(amount) {
            // Setting players bet
            this.player.bet = amount
        },
        hit() {
            if (this.canHit) {
                const deckStore = useDeckStore()
                this.player.cards.push(deckStore.flipCard(deckStore.takeCard()))
            }
        },
        stay() {
            // Game ends
            this.player.stay = true
            this.showResults()
        },
        showResults() {
            // Dealer's turn
            // Dealing cards until he have more than 17
            const deckStore = useDeckStore()
            while (this.getDealerRealSum < 17) {
                this.dealer.cards.push(deckStore.flipCard(deckStore.takeCard())) // Add card to dealer's hand
            }

            // Flip every hidden card from dealer
            this.dealer.cards.forEach((card) => {
                if (card.hidden) {
                    deckStore.flipCard(card)
                }
            })

            // Showing results and therefore ending the game
            // Game running state stays true until the user clicks on the new game button
            this.results = true
        }
    },
    getters: {
        getDealerCards: (state) => state.dealer.cards,
        getPlayerCards: (state) => state.player.cards,
        getDealerSum() { return this.calculateDeckSum(this.getDealerCards) }, // Dealer's sum without hidden cards
        getDealerRealSum() { return this.calculateDeckSum(this.getDealerCards, false) }, // Dealer's real sum with all cards
        getPlayerSum() { return this.calculateDeckSum(this.getPlayerCards) },
        getGameRunning: (state) => state.running,
        getShowResults: (state) => state.results,
        getPlayersBet: (state) => state.player.bet,
        getGameResults() {
            const dealerSum = this.getDealerSum
            const playerSum = this.getPlayerSum

            // Win/lose conditions
            if (playerSum > 21) {
                return {
                    win: false,
                    title: 'You lose!',
                    message: 'You have more than 21! 🤪',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum === 21) {
                // TODO: The player gets a higher payout -> 3:2
                return {
                    win: 'blackjack',
                    title: 'You win!',
                    message: 'BLACKJACK! 🤩',
                    dealerSum,
                    playerSum
                }
            } else if (dealerSum > 21) {
                return {
                    win: true,
                    title: 'You win!',
                    message: 'Dealer has more than 21! 🥳🎉',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum === dealerSum) {
                // TODO: The player gets his bet back.
                return {
                    win: 'tie',
                    title: 'Draw!',
                    message: 'Both have the same sum! 🤔',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum > dealerSum) {
                return {
                    win: true,
                    title: 'You win!',
                    message: 'You have more than the dealer! 🥳🎉',
                    dealerSum,
                    playerSum
                }
            } else if (playerSum < dealerSum) {
                return {
                    win: false,
                    title: 'You lose!',
                    message: 'You have less than the dealer! 🤡',
                    dealerSum,
                    playerSum
                }
            } else {
                return {
                    win: 'error',
                    title: 'Error!',
                    message: 'Something went wrong! ⚠️',
                    dealerSum,
                    playerSum
                }
            }
        },
        canHit(state) {
            // If player has not stayed and has less than 21
            // Also allows the player (you) to draw while < 21
            // Returns true/false
            return !state.player.stay && this.calculateDeckSum(state.player.cards) < 21
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
