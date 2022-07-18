<template>
    <AppCard class="mt-2">
        <div class="flex flex-col">
            <div class="flex flex-col items-center mb-2">
                <p>{{ appStore.getTitle }}</p>
                <p>SET YOUR BETS!!!</p>
            </div>
            <div class="grid grid-cols-1 gap-4 mt-4">
                <AppButton class="font-montserrat col-span-1" @click="startGame">Play</AppButton>
            </div>
        </div>
    </AppCard>
</template>

<script setup>
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useGameStore } from '~/store/game'
import { useAppStore } from '~/store/app'

// Using stores
const appStore = useAppStore()
const gameStore = useGameStore()

// Starting new game
const startGame = () => { gameStore.startGame() }
</script>
