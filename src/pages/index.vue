<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section class="flex justify-center p-8">
            <AppCard class="mt-2 max-w-lg">
                <div class="flex flex-col">
                    <div class="flex flex-col items-center mb-2">
                        <p class="text-4xl md:text-5xl mb-4">{{ appStore.getTitle }}</p>
                    </div>
                    <div class="flex flex-col mb-4">
                        <p>Vue-Jack is a small blackjack clone.</p>
                        <p>You can find the rules of the game by clicking the button below.</p>
                    </div>
                    <div class="flex flex-col mb-4">
                        <p>It was built using Vue3/Nuxt3 and Tailwind for the design.</p>
                        <p>You can find the source code on Github by clicking the button in the top corner.</p>
                    </div>
                    <div class="flex flex-col mb-4">
                        <p>If you want more information about me, please visit my <a class="hover:text-primary underline underline-offset-2 cursor-pointer" :href="homepageUrl" target="_blank">homepage</a>.</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <NuxtLink :to="'/game'" class="col-span-1"><AppButton class="font-montserrat w-full" uppercase>New Game</AppButton></NuxtLink>
                        <NuxtLink :to="'/rules'" class="col-span-1"><AppButton class="font-montserrat w-full" type="secondary" uppercase>Rules</AppButton></NuxtLink>
                    </div>
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

// Get homepage link
const homepageUrl = appStore.getHomepageUrl
</script>

<style scoped>
</style>
