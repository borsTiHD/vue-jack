<template>
    <nav class="bg-black/10 dark:bg-black/50 flex items-center w-full p-2 px-4 mx-auto my-0 z-30">
        <div class="nav-primary flex items-center">
            <div class="block">
                <NuxtLink
                    v-for="(item, index) in navItems"
                    :key="index"
                    :to="item.to"
                    class="group relative inline-block text-gray-900 dark:text-white p-2 m-0 mx-4"
                    :class="{ 'text-2xl': menu }"
                    @click="closeMenu"
                >
                    {{ item.name }}<span class="w-16 h-0.5 mx-auto block absolute bottom-1 left-0 right-0 group-hover:bg-primary transition-all duration-200 group-hover:scale-x-[0.3]" />
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { usePagesStore } from '~/store/pages'

// Navitems
const pagesStore = usePagesStore()
const navItems = computed(() => pagesStore.getPages)
</script>

<style scoped>
.nav-primary a.router-link-active  {
	font-weight: bold;
}
</style>
