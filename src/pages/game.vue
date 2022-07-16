<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col p-8">
            <div class="mx-auto">
                <!-- Modal - for game result -->
                <AppModal v-model="showModal">
                    <template #header>{{ resultsTitel }}</template>
                    <template #content>
                        <div class="flex flex-col">
                            <p class="text-xl mb-2">{{ gameResults.message }}</p>
                            <p>Dealer: {{ gameResults.dealerSum }}</p>
                            <p>You: {{ gameResults.playerSum }}</p>
                        </div>
                    </template>
                    <template #footer>
                        <AppButton class="font-montserrat ml-2" @click="nextGame">Next Game</AppButton>
                    </template>
                </AppModal>
                <!-- Dealer -->
                <AppCard class="mt-2">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center mb-2">
                            <p>Dealer:</p>
                            <GameScore :score="dealerSum" />
                        </div>
                        <!-- Dealer cards -->
                        <TransitionGroup v-if="dealerCards" name="cards" tag="div" class="flex flex-row mx-auto">
                            <GameCard v-for="(card, index) in dealerCards" :key="index + card.name" :card="card" :class="dealerCards.length > index + 1 ? '-mr-16' : ''" />
                        </TransitionGroup>
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
                        <TransitionGroup v-if="playerCards" name="cards" tag="div" class="flex flex-row mx-auto">
                            <GameCard v-for="(card, index) in playerCards" :key="index + card.name" :card="card" :class="playerCards.length > index + 1 ? '-mr-16' : ''" />
                        </TransitionGroup>
                        <div class="flex flex-row mt-4">
                            <AppButton class="font-montserrat mr-2" :disabled="!playerCanHit" @click="gameStore.hit()">Hit</AppButton>
                            <AppButton class="font-montserrat ml-2" type="secondary" :disabled="!gameRunning" @click="gameStore.stay()">Stay</AppButton>
                            <AppButton v-if="!gameRunning" class="font-montserrat ml-4" @click="nextGame">Next Game</AppButton>
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
const pageTitle = `Game - ${appStore.getTitle}`
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
const resultsTitel = computed(() => {
    const results = gameStore.getGameResults
    if (results.win === true) {
        return 'You win!'
    } else if (results.win === false) {
        return 'You lose!'
    } else if (results.win === 'blackjack') {
        return 'Blackjack!'
    } else if (results.win === 'tie') {
        return 'Draw!'
    } else {
        return 'Error!'
    }
})
watch(gameRunning, (newValue) => {
    if (!newValue) {
        showModal.value = true // After game is over, show modal
    }
})

// Starting new game
const nextGame = () => {
    showModal.value = false
    gameStore.startGame()
}

// Starting game on client side
onMounted(() => {
    gameStore.startGame() // New Game
})
</script>

<style>
.cards-enter-active,
.cards-leave-active {
    transition: all 0.5s ease;
}

.cards-enter-from,
.cards-leave-to {
    opacity: 50;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.cards-leave-active {
    position: absolute;
}
</style>
