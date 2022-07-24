import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDarkModeStore } from '../../src/store/darkmode'

describe('Darkmode store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('checks darkmode states', async() => {
        const store = useDarkModeStore()
        expect(store.isDarkMode).toBeTruthy() // Default ist true
        store.setDarkMode(false) // Set to false
        expect(store.isDarkMode).toBeFalsy() // Now false
    })
})
