import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCreditStore } from '../../src/store/credits'

describe('Credit store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('get default credits', async() => {
        const store = useCreditStore()
        expect(store.getCredits).toBe(500)
    })

    it('set default credits', async() => {
        const store = useCreditStore()
        store.resetCredits()
        expect(store.getCredits).toBe(500)
    })

    it('add credits', async() => {
        const store = useCreditStore()
        const defaultCredits = store.getCredits
        const randomAmount = Math.floor(Math.random() * 100)
        store.addCredits(randomAmount) // Add random credits
        expect(store.getCredits).toBe(defaultCredits + randomAmount) // Check if credits are added
    })

    it('subtract credits', async() => {
        const store = useCreditStore()
        const defaultCredits = store.getCredits
        const randomAmount = Math.floor(Math.random() * 100)
        store.subtractCredits(randomAmount) // Subtract random credits
        expect(store.getCredits).toBe(defaultCredits - randomAmount) // Check if credits are subtracted
    })
})
