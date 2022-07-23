import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '../../src/store/game'

describe('Game store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it.each([...Array(100)])('checks multiple game lifecycles', async() => {
        const store = useGameStore()
        store.newGame() // Resetting the game
        expect(store.getGameRunning).toBeFalsy() // Check if game is not running
        store.setBet(10) // Setting the bet
        expect(store.getPlayersBet).toBe(10) // Check if bet is set correctly
        store.startGame() // Start a new game
        expect(store.getGameRunning).toBeTruthy() // Check if game is running

        // Check if player gets blackjack after game starts
        if (store.getShowResults) {
            expect(store.getPlayerSum).toBe(21) // Check if player has blackjack (21)
            expect(store.getPlayerCards).toHaveLength(2) // Check if player has 2 cards (blackjack only possible with 2 cards)
            expect(store.getDealerCards.length).toBeGreaterThanOrEqual(2) // Check if dealer has 2 or more cards
            expect(store.getDealerSum).toBeGreaterThanOrEqual(17) // Check if dealer has 17 or more

            // Check game results to be correct
            expect(store.getGameResults).toEqual({
                win: 'blackjack',
                title: 'You win!',
                message: 'BLACKJACK! 🤩',
                playerSum: 21,
                dealerSum: store.getDealerSum
            })
        } else {
            expect(store.getPlayerCards).toHaveLength(2) // Check if player has 2 cards
            expect(store.getDealerCards).toHaveLength(2) // Check if dealer has 2 cards
            expect(store.getPlayerSum).toBeGreaterThan(0) // Check if player sum is greater than 0
            expect(store.getDealerSum).toBeGreaterThan(0) // Check if dealer sum is greater than 0
            expect(store.getDealerRealSum).toBeGreaterThan(0) // Check if dealer real sum is greater than 0

            // Player take cards until he has more than 17 or can't hit anymore
            while (store.getPlayerSum < 17 && store.canHit) {
                store.hit()
            }
            store.stay() // Stay and end game

            // Check if game is over
            expect(store.getShowResults).toBeTruthy()

            // Check game results to be correct
            const gameResults = store.getGameResults
            expect(gameResults.win).toBeDefined()
            expect(gameResults.title).toBeTypeOf('string')
            expect(gameResults.message).toBeTypeOf('string')
            expect(gameResults.playerSum).toBeTypeOf('number')
            expect(gameResults.dealerSum).toBeTypeOf('number')
        }
    })
})
