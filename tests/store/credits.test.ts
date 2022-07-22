import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCreditStore } from '../../src/store/credits'

describe('Credit Store Tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Get Default Credits', async() => {
        const appStore = useCreditStore()
        expect(appStore.getCredits).toBe(500)
    })

    it('Set Default Credits', async() => {
        const appStore = useCreditStore()
        appStore.resetCredits()
        expect(appStore.getCredits).toBe(500)
    })

    it('Add Credits', async() => {
        const appStore = useCreditStore()
        const defaultCredits = appStore.getCredits
        const randomAmount = Math.floor(Math.random() * 100)
        appStore.addCredits(randomAmount) // Add random credits
        expect(appStore.getCredits).toBe(defaultCredits + randomAmount) // Check if credits are added
    })

    it('Subtract Credits', async() => {
        const appStore = useCreditStore()
        const defaultCredits = appStore.getCredits
        const randomAmount = Math.floor(Math.random() * 100)
        appStore.subtractCredits(randomAmount) // Subtract random credits
        expect(appStore.getCredits).toBe(defaultCredits - randomAmount) // Check if credits are subtracted
    })
})
