<template>
	<Body :class="[{ dark: isDarkMode }, isDarkMode ? 'bg-body-bg' : 'bg-white']">
		<div class="bg-fixed bg-bottom">
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
