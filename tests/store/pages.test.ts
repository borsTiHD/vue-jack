import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePagesStore } from '../../src/store/pages'

describe('Page store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('check pages', async() => {
        const store = usePagesStore()
        expect(store.getPages.length).toBeGreaterThanOrEqual(0) // Check if pages is not empty
        describe.each(store.getPages)('Check every Page', (page) => {
            expect(page).toHaveProperty('name') // Check if page has a name
            expect(page).toHaveProperty('to') // Check if page has a to property
        })
    })
})
