<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="game" class="flex justify-center flex-col p-8">
            <div class="mx-auto">
                <!-- Modal - for game result -->
                <GameResult @next-game="nextGame" />

                <!-- Dealer -->
                <DealerBoard />

                <!-- Player -->
                <PlayerBoard />
            </div>
        </section>
    </div>
</template>

<script setup>
import DealerBoard from '@/components/game/DealerBoard.vue'
import PlayerBoard from '@/components/game/PlayerBoard.vue'
import GameResult from '@/components/game/GameResult.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'

// Changing title
const appStore = useAppStore()
const pageTitle = `Game - ${appStore.getTitle}`
useHead({ title: pageTitle })

// Using game store
const gameStore = useGameStore()

// Starting new game
const nextGame = () => { gameStore.startGame() }

// Starting game on client side
onMounted(() => { gameStore.startGame() })
</script>
