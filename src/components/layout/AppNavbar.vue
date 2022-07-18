<template>
    <nav class="bg-black/10 dark:bg-black/50 flex items-center w-full p-2 px-4 mx-auto my-0 z-30">
        <div class="nav-primary flex items-center">
            <!-- Navbar items - 'menu' determines whether the mobile menu is displayed or not -->
            <div :class="menu ? 'bg-white dark:bg-body-bg fixed inset-0 flex flex-col justify-center items-center uppercase z-40' : 'hidden md:block'">
                <NuxtLink
                    v-for="(item, index) in navItems"
                    :key="index"
                    :to="item.to"
                    class="group relative inline-block text-gray-900 dark:text-white p-1 sm:p-2 m-4 sm:m-0 sm:mx-4"
                    :class="{ 'text-2xl': menu }"
                    @click="closeMenu"
                >
                    {{ item.name }}<span class="w-16 h-0.5 mx-auto block absolute bottom-1 left-0 right-0 group-hover:bg-primary transition-all duration-200 group-hover:scale-x-[0.3]" />
                </NuxtLink>
            </div>

            <!-- Menu button for smaller devices -->
            <button class="md:hidden bg-primary ml-4 p-3 rounded-[24px] hover:bg-white transition-all z-50" @click="toggleMenu">
                <!-- https://icones.js.org/collection/mdi?s=menu -->
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path v-if="!menu" fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
                    <path v-else fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
                </svg>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { usePagesStore } from '~/store/pages'

// Navitems
const pagesStore = usePagesStore()
const navItems = computed(() => pagesStore.getPages)

// Menu control for mobile view
const menu = ref(false) // State for the menu to be shown
const toggleMenu = () => { menu.value = !menu.value }
const closeMenu = () => { menu.value = false }
</script>

<style scoped>
.nav-primary a.router-link-active  {
	font-weight: bold;
}
</style>
