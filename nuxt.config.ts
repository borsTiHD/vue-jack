import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    srcDir: 'src/',
    runtimeConfig: {
    },
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    buildModules: ['@pinia/nuxt'],
    tailwindcss: {
        viewer: false
    },
    vite: {
        plugins: [
            eslintPlugin()
        ]
    }
})
