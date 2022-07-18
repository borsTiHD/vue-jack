<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col p-4">
            <!-- Modal - for game result -->
            <GameResult @next-game="nextGame" />

            <!-- Betting window -->
            <div v-if="!gameRunning" class="mx-auto">
                <GameBet />
            </div>

            <!-- Game running -->
            <div v-else class="mx-auto">
                <!-- Result title -->
                <div v-if="showResult" class="grid justify-items-center text-4xl mb-4"><p>{{ gameResults.title }}</p></div>

                <!-- Credits -->
                <DisplayCredits />

                <!-- Dealer -->
                <DealerBoard />

                <!-- Player -->
                <PlayerBoard />
            </div>
        </section>
    </div>
</template>

<script setup>
import GameBet from '@/components/game/GameBet.vue'
import GameResult from '@/components/game/GameResult.vue'
import DealerBoard from '@/components/game/DealerBoard.vue'
import PlayerBoard from '@/components/game/PlayerBoard.vue'
import DisplayCredits from '@/components/game/DisplayCredits.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'

// Changing title
const appStore = useAppStore()
const pageTitle = `Game - ${appStore.getTitle}`
useHead({ title: pageTitle })

// Using game store
const gameStore = useGameStore()

// Game states
const gameRunning = computed(() => gameStore.getGameRunning)
const showResult = computed(() => gameStore.getShowResults) // Show results
const gameResults = computed(() => gameStore.getGameResults) // Result of game

// Starting new game
const nextGame = () => { gameStore.newGame() }
</script>
