<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col bg-white dark:bg-body-bg p-8">
            <div class="mx-auto">
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">Dealer:</p>
                    </div>
                </AppCard>
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">You:</p>
                        <div class="flex flex-row">
                            <AppButton class="font-montserrat mr-2" uppercase @click="hitCard">Hit</AppButton>
                            <AppButton class="font-montserrat ml-2" uppercase @click="stayMove">Stay</AppButton>
                        </div>
                    </div>
                </AppCard>
            </div>
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

// Hit new card
const hitCard = () => {
    console.log('Hite new card')
}

// Stay
const stayMove = () => {
    console.log('Stay')
}
</script>

<style scoped>
</style>
