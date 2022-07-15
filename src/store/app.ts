import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app-store',
    state: () => ({
        appTitle: 'Vue-Jack 🃏'
    }),
    getters: {
        getTitle: (state) => state.appTitle
    }
})
