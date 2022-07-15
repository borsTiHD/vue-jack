<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col bg-white dark:bg-body-bg p-8">
            <div class="mx-auto">
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">Dealer:</p>
                        <div id="dealer-cards" class="flex flex-row">
                            <!-- Hidden card -->
                            <div v-if="dealerHidden" class="card-face back">
                                <div class="card-face-inner">
                                    <img
                                        :src="`/img/cards/BACK.png`"
                                        alt="hidden"
                                        class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                        loading="lazy"
                                    >
                                </div>
                            </div>
                            <!-- Remaining dealer cards -->
                            <div
                                v-for="card in dealerCards"
                                :key="card.name"
                                class="card-face front"
                            >
                                <div class="card-face-inner">
                                    <img
                                        :src="`/img/cards/${card.name}.png`"
                                        :alt="card.name"
                                        class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                        loading="lazy"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">You:</p>
                        <div class="flex flex-row">
                            <AppButton class="font-montserrat mr-2" uppercase @click="hitMove">Hit</AppButton>
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
import { useGameStore } from '~/store/game'
import { useDeckStore } from '~/store/deck'

// Changing title
const appStore = useAppStore()
const pageTitle = `Home - ${appStore.getTitle}`
useHead({ title: pageTitle })

// Using stores
const gameStore = useGameStore()
const deckStore = useDeckStore()

// New Game
gameStore.startGame() // Starting new game

// Dealer cards
const dealerHidden = computed(() => gameStore.getDealerHidden)
const dealerCards = computed(() => deckStore.getDealerCards)

// Hit new card
const hitMove = () => {
    console.log('Hit new card')
    gameStore.hit()
}

// Stay
const stayMove = () => {
    console.log('Stay')
    gameStore.stay()
}
</script>

<style scoped>
</style>
