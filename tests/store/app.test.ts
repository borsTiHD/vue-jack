import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../../src/store/app'

describe('App store tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('get app title', async() => {
        const store = useAppStore()
        expect(store.getTitle).toBe('Vue-Jack 🃏')
    })

    it('get homepage', async() => {
        const store = useAppStore()
        expect(store.getHomepageUrl).toBe('https://www.borstihd.de')
    })

    it('get git repo', async() => {
        const store = useAppStore()
        expect(store.getGitUrl).toBe('https://github.com/borsTiHD/vue-jack')
    })
})
