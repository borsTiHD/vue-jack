<template>
    <AppCard class="mt-2">
        <div class="flex flex-col">
            <div class="flex flex-col items-center mb-2">
                <p class="text-5xl mb-4">{{ appStore.getTitle }}</p>
                <p>Start the game after you set your bet.</p>
            </div>
            <div class="grid grid-cols-4 gap-4 my-2">
                <PhPokerChipFill class="col-span-1" :class="currentCredits < 10 ? 'fill-gray-600' : 'fill-red-500'" :value="10" @click="setCredits(10)" />
                <PhPokerChipFill class="col-span-1" :class="currentCredits < 25 ? 'fill-gray-600' : 'fill-green-600'" :value="25" @click="setCredits(25)" />
                <PhPokerChipFill class="col-span-1" :class="currentCredits < 50 ? 'fill-gray-600' : 'fill-blue-500'" :value="50" @click="setCredits(50)" />
                <PhPokerChipFill class="col-span-1" :class="currentCredits < 100 ? 'fill-gray-600' : 'fill-black'" :value="100" @click="setCredits(100)" />
            </div>
            <DisplayCredits class="my-2" />
            <div class="grid grid-cols-1 gap-4 mt-2">
                <AppButton v-if="currentCredits >= 10" class="font-montserrat col-span-1" :disabled="currentlyCreditsSet < 1 || currentCredits < currentlyCreditsSet" @click="startGame">Play</AppButton>
                <AppButton v-else class="font-montserrat col-span-1" type="secondary" @click="resetCredits">Reset Credits</AppButton>
            </div>
        </div>
    </AppCard>
</template>

<script setup>
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import DisplayCredits from '@/components/game/DisplayCredits.vue'
import PhPokerChipFill from '@/components/icons/PhPokerChipFill.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'
import { useCreditStore } from '~/store/credits'

// Using stores
const appStore = useAppStore()
const gameStore = useGameStore()
const creditStore = useCreditStore()

// Credits states
const currentCredits = computed(() => creditStore.getCredits)
const currentlyCreditsSet = computed(() => gameStore.getPlayersBet)

// Set credits if you have enough
const setCredits = (creditsToBeSet) => {
    if (currentCredits.value >= creditsToBeSet) {
        gameStore.setBet(creditsToBeSet)
    }
}

// Set credits and start game
const startGame = () => {
    const newBet = currentlyCreditsSet.value
    // Bet needs to be set more than 0 credits and player need to have at least the smallest bet
    if (newBet > 0 && currentCredits.value >= 10 && currentCredits.value >= newBet) {
        creditStore.subtractCredits(newBet)
        gameStore.setBet(newBet)
        gameStore.startGame()
    }
}

// Reset credits
const resetCredits = () => {
    creditStore.resetCredits()
}
</script>
