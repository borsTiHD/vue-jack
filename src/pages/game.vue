<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col bg-white dark:bg-body-bg p-8">
            <div class="mx-auto">
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">Dealer: {{ visibleDealerSum }}</p>
                        <div v-if="dealerHidden && dealerOtherCards" id="dealer-cards" class="flex flex-row">
                            <!-- Hidden card -->
                            <div v-if="dealerHidden" class="card-face back mr-2">
                                <img
                                    :src="`/img/cards/BACK.png`"
                                    alt="hidden"
                                    class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                    loading="lazy"
                                >
                            </div>
                            <!-- Remaining dealer cards -->
                            <div
                                v-for="(card, i) in dealerOtherCards"
                                :key="card.name"
                                class="card-face front"
                                :class="dealerOtherCards.length > i + 1 ? 'mr-2' : ''"
                            >
                                <img
                                    :src="`/img/cards/${card.name}.png`"
                                    :alt="card.name"
                                    class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                    loading="lazy"
                                >
                            </div>
                        </div>
                    </div>
                </AppCard>
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <p class="mb-2">You: {{ playerSum }}</p>
                        <!-- Player cards -->
                        <div v-if="playerCards" id="dealer-cards" class="flex flex-row">
                            <div
                                v-for="(card, i) in playerCards"
                                :key="card.name"
                                class="card-face front"
                                :class="playerCards.length > i + 1 ? 'mr-2' : ''"
                            >
                                <img
                                    :src="`/img/cards/${card.name}.png`"
                                    :alt="card.name"
                                    class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                    loading="lazy"
                                >
                            </div>
                        </div>
                        <div class="flex flex-row mt-4">
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
import { onMounted } from 'vue'
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'

// Changing title
const appStore = useAppStore()
const pageTitle = `Home - ${appStore.getTitle}`
useHead({ title: pageTitle })

// Using stores
const gameStore = useGameStore()

// Dealer cards + Dealer sum (without hidden card)
const dealerHidden = computed(() => gameStore.getDealerHidden)
const dealerOtherCards = computed(() => gameStore.getDealerOtherCards)
const visibleDealerSum = computed(() => gameStore.calculateDeckSum(gameStore.getDealerOtherCards))

// Player cards + Player sum
const playerCards = computed(() => gameStore.getPlayerCards)
const playerSum = computed(() => gameStore.getPlayerSum)

// Starting game on client side
onMounted(() => {
    gameStore.startGame() // New Game
})

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
