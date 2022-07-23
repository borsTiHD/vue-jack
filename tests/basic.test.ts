import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('App tests', async() => {
    await setup({
        rootDir: fileURLToPath(new URL('..', import.meta.url))
    })

    it('renders /', async() => {
        expect(await $fetch('/')).toContain('Vue-Jack 🃏')
    })

    it('renders /rules', async() => {
        expect(await $fetch('/rules')).toContain('♠️♥️ Game rules ♦️♣️')
    })

    it('renders /game', async() => {
        expect(await $fetch('/game')).toContain('Vue-Jack 🃏')
    })
})
