<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col bg-white dark:bg-body-bg p-8">
            <div class="mx-auto">
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center mb-2">
                            <p>Dealer:</p>
                            <GameScore :score="dealerSum" />
                            <p>({{ dealerRealSum }})</p>
                        </div>
                        <div v-if="dealerCards" id="dealer-cards" class="flex flex-row mx-auto">
                            <!-- Dealer cards -->
                            <GameCard v-for="(card, index) in dealerCards" :key="index" :card="card" :class="dealerCards.length > index + 1 ? 'mr-2' : ''" />
                        </div>
                    </div>
                </AppCard>
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center mb-2">
                            <p>You:</p>
                            <GameScore :score="playerSum" />
                        </div>
                        <!-- Player cards -->
                        <div v-if="playerCards" id="player-cards" class="flex flex-row mx-auto">
                            <GameCard v-for="(card, index) in playerCards" :key="index" :card="card" :class="playerCards.length > index + 1 ? 'mr-2' : ''" />
                        </div>
                        <div class="flex flex-row mt-4">
                            <AppButton class="font-montserrat mr-2" uppercase :disabled="!playerCanHit" @click="hitMove">Hit</AppButton>
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
import GameCard from '@/components/game/GameCard.vue'
import GameScore from '@/components/game/GameScore.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'

// Changing title
const appStore = useAppStore()
const pageTitle = `Home - ${appStore.getTitle}`
useHead({ title: pageTitle })

// Using stores
const gameStore = useGameStore()

// Dealer cards + Dealer sum (without hidden card)
const dealerCards = computed(() => gameStore.getDealerCards)
const dealerSum = computed(() => gameStore.getDealerSum)
const dealerRealSum = computed(() => gameStore.getDealerRealSum)

// Player cards + Player sum
const playerCards = computed(() => gameStore.getPlayerCards)
const playerSum = computed(() => gameStore.getPlayerSum)
const playerCanHit = computed(() => gameStore.canHit)

// Starting game on client side
onMounted(() => {
    gameStore.startGame() // New Game
})

// Hit new card
const hitMove = () => {
    if (gameStore.canHit) {
        gameStore.hit()
    }
}

// Stay
const stayMove = () => {
    gameStore.stay()
}
</script>

<style scoped>
</style>
