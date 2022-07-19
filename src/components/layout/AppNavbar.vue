<template>
    <nav class="bg-black/10 dark:bg-black/50 flex flex-row p-2 px-4 my-0 z-30">
        <div class="nav-primary flex flex-row">
            <NuxtLink
                v-for="(item, index) in navItems"
                :key="index"
                :to="item.to"
                class="group relative inline-block text-gray-900 dark:text-white p-2 m-0 mx-4"
            >
                {{ item.name }}<span class="w-16 h-0.5 mx-auto block absolute bottom-1 left-0 right-0 group-hover:bg-primary transition-all duration-200 group-hover:scale-x-[0.3]" />
            </NuxtLink>
        </div>
        <div class="ml-auto">
            <NuxtLink class="" target="_blank" :to="gitUrl">
                <AppButton>
                    <span class="flex flex-row gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                        </svg>
                        <p invisible md:visible>GitHub</p>
                    </span>
                </AppButton>
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup>
import AppButton from '@/components/misc/AppButton.vue'
import { useAppStore } from '~/store/app'
import { usePagesStore } from '~/store/pages'

// Github repo link
const appStore = useAppStore()
const gitUrl = appStore.getGitUrl

// Navitems
const pagesStore = usePagesStore()
const navItems = computed(() => pagesStore.getPages)
</script>

<style scoped>
.nav-primary a.router-link-active  {
	font-weight: bold;
}
</style>
