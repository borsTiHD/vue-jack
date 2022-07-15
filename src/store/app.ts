import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app-store',
    state: () => ({
        headTitle: 'Vue-Jack'
    }),
    getters: {
        getTitle: (state) => state.headTitle
    }
})
