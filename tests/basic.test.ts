import { fileURLToPath } from 'node:url'
import { describe, test, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('App Tests', async() => {
    await setup({
        rootDir: fileURLToPath(new URL('..', import.meta.url))
    })

    it('Renders /', async() => {
        expect(await $fetch('/')).toContain('Vue-Jack 🃏')
    })

    it('Renders /rules', async() => {
        expect(await $fetch('/rules')).toContain('♠️♥️ Game rules ♦️♣️')
    })

    it('Renders /game', async() => {
        expect(await $fetch('/game')).toContain('Vue-Jack 🃏')
    })

    test('my test', () => {
        // ...
    })
})
