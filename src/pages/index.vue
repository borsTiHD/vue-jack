<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section class="flex justify-center p-8">
            <AppCard class="mt-2">
                <div class="flex flex-col">
                    <p class="mb-2">Want to play {{ appStore.getTitle }}?</p>
                    <NuxtLink :to="'/game'">
                        <AppButton class="font-montserrat w-full" uppercase>New Game</AppButton>
                    </NuxtLink>
                </div>
            </AppCard>
        </section>
    </div>
</template>

<script setup>
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useAppStore } from '~/store/app'

// Changing title
const appStore = useAppStore()
const pageTitle = `Home - ${appStore.getTitle}`
useHead({ title: pageTitle })
</script>

<style scoped>
</style>
