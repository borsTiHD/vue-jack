import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app-store',
    state: () => ({
        appTitle: 'Vue-Jack 🃏',
        git: 'https://github.com/borsTiHD/vue-jack'
    }),
    getters: {
        getTitle: (state) => state.appTitle,
        getGitUrl: (state) => state.git
    }
})
