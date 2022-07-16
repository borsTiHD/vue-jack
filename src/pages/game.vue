<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col p-8">
            <div class="mx-auto">
                <!-- Modal - for game result -->
                <AppModal v-model="showModal">
                    <template #header>{{ gameResults.win ? 'WIN!!!' : 'Loose!' }}</template>
                    <template #content>
                        <div class="flex flex-col">
                            <p class="text-xl mb-2">{{ gameResults.message }}</p>
                            <p>Dealer: {{ gameResults.dealerSum }}</p>
                            <p>You: {{ gameResults.playerSum }}</p>
                        </div>
                    </template>
                    <template #footer>
                        <AppButton class="font-montserrat ml-2" uppercase @click="newGame">New Game</AppButton>
                    </template>
                </AppModal>
                <!-- Dealer -->
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center mb-2">
                            <p>Dealer:</p>
                            <GameScore :score="dealerSum" />
                        </div>
                        <div v-if="dealerCards" id="dealer-cards" class="flex flex-row mx-auto">
                            <!-- Dealer cards -->
                            <GameCard v-for="(card, index) in dealerCards" :key="index" :card="card" :class="dealerCards.length > index + 1 ? 'mr-2' : ''" />
                        </div>
                    </div>
                </AppCard>
                <!-- Player -->
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
                            <AppButton class="font-montserrat ml-2" uppercase :disabled="!gameRunning" @click="stayMove">Stay</AppButton>
                            <AppButton v-if="!gameRunning" class="font-montserrat ml-4" uppercase @click="newGame">New Game</AppButton>
                        </div>
                    </div>
                </AppCard>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import AppModal from '@/components/misc/AppModal.vue'
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

// Player cards + Player sum
const playerCards = computed(() => gameStore.getPlayerCards)
const playerSum = computed(() => gameStore.getPlayerSum)
const playerCanHit = computed(() => gameStore.canHit)

// Game result + watcher for game result
const showModal = ref(false) // Modal state
const gameRunning = computed(() => gameStore.getGameRunning)
const gameResults = computed(() => gameStore.getGameResults) // Result of game
watch(gameRunning, (newValue) => {
    if (!newValue) {
        showModal.value = true // After game is over, show modal
    }
})

// Starting new game
const newGame = () => {
    showModal.value = false
    gameStore.startGame()
}

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
