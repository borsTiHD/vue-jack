<template>
    <Body :class="[{ dark: isDarkMode }, isDarkMode ? 'bg-gradient-to-r from-blackjack-dark via-blackjack-light to-blackjack-dark' : 'bg-blackjack-light']">
        <div class="bg-fixed bg-bottom">
            <AppNavbar />
            <main>
                <NuxtPage />
            </main>
        </div>
    </Body>
</template>

<script setup>
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'
import '@fontsource/montserrat'

import AppNavbar from '@/components/layout/AppNavbar.vue'
import { useDarkModeStore } from '~/store/darkmode'

// Using store and create computed 'DarkMode' property
const darkModeStore = useDarkModeStore()
const isDarkMode = computed(() => darkModeStore.isDarkMode)
</script>

<style>
	/* Default font */
	body {
		font-family: "Roboto";
	}
</style>
