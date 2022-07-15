<template>
	<div class="flex flex-col">
		<section>
			<div>
				new project :D
			</div>
		</section>
	</div>
</template>

<script setup>
import { useAppStore } from '~/store/app'

// Changing title
const appStore = useAppStore()
const pageTitle = `Home - ${appStore.getTitle}`
useHead({ title: pageTitle })
</script>

<style scoped>
</style>
