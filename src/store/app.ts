import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app-store',
    state: () => ({
        appTitle: 'Vue-Jack 🃏',
        homepage: 'https://www.borstihd.de',
        git: 'https://github.com/borsTiHD/vue-jack'
    }),
    getters: {
        getTitle: (state) => state.appTitle,
        getHomepageUrl: (state) => state.homepage,
        getGitUrl: (state) => state.git
    }
})
