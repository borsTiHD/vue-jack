import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../../src/store/app'

describe('App Store Tests', async() => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('Get App Title', async() => {
        const appStore = useAppStore()
        expect(appStore.getTitle).toBe('Vue-Jack 🃏')
    })

    it('Get Homepage', async() => {
        const appStore = useAppStore()
        expect(appStore.getHomepageUrl).toBe('https://www.borstihd.de')
    })

    it('Get Git Repo', async() => {
        const appStore = useAppStore()
        expect(appStore.getGitUrl).toBe('https://github.com/borsTiHD/vue-jack')
    })
})
