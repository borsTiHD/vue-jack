<template>
    <AppCard class="pt-2">
        <div class="flex flex-col">
            <div class="flex flex-row items-center mb-2">
                <p>You:</p>
                <DisplayScore :score="playerSum" />
            </div>
            <!-- Player cards -->
            <TransitionGroup v-if="playerCards" name="cards" tag="div" class="flex flex-row mx-auto">
                <GameCard v-for="(card, index) in playerCards" :key="index + card.name" :card="card" :class="playerCards.length > index + 1 ? '-mr-16' : ''" />
            </TransitionGroup>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <AppButton class="font-montserrat col-span-1" :disabled="!playerCanHit" @click="gameStore.hit()">Hit</AppButton>
                <AppButton class="font-montserrat col-span-1" type="secondary" :disabled="showingResults" @click="gameStore.stay()">Stay</AppButton>
                <AppButton v-if="showingResults" class="font-montserrat col-span-2" @click="nextGame">Next Game</AppButton>
            </div>
        </div>
    </AppCard>
</template>

<script setup>
import { watch } from 'vue'
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import GameCard from '@/components/game/GameCard.vue'
import DisplayScore from '@/components/game/DisplayScore.vue'
import { useGameStore } from '~/store/game'

// Using game store
const gameStore = useGameStore()

// Game running state
const gameRunning = computed(() => gameStore.getGameRunning)
const showingResults = computed(() => gameStore.getShowResults)

// Player cards + Player sum
const playerCards = computed(() => gameStore.getPlayerCards)
const playerSum = computed(() => gameStore.getPlayerSum)
const playerCanHit = computed(() => gameStore.canHit)

// Watcher if game is running and player can't hit anymore
watch(playerCanHit, (newValue) => {
    if (!newValue && gameRunning.value) {
        // Game ends - player is equal or above 21
        gameStore.stay()
    }
})

// Starting new game
const nextGame = () => { gameStore.newGame() }
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
