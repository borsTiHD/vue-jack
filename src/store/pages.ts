import { defineStore } from 'pinia'
import { useAppStore } from '~/store/app'

export const usePagesStore = defineStore({
    id: 'pages-store',
    state: () => {
        const appStore = useAppStore()
        return {
            pages: [
                {
                    name: appStore.getTitle,
                    to: '/'
                }
            ]
        }
    },
    getters: {
        getPages: (state) => state.pages
    }
})
