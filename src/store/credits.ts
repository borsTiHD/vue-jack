import { defineStore } from 'pinia'

export const useCreditStore = defineStore({
    id: 'credit-store',
    state: () => ({
        credits: 99
    }),
    actions: {
        resetCredits() {
            this.credits = 500
        },
        addCredits(amount) {
            this.credits += amount
        },
        subtractCredits(amount) {
            this.credits -= amount
        }
    },
    getters: {
        getCredits: (state) => state.credits
    }
})
