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
            <div class="flex flex-col items-center my-2">
                <p>Currently set: {{ currentlyCreditsSet }} credits.</p>
                <p>You have {{ currentCredits }} credits.</p>
            </div>
            <div class="grid grid-cols-1 gap-4 mt-2">
                <AppButton class="font-montserrat col-span-1" :disabled="currentlyCreditsSet < 1" @click="startGame">Play</AppButton>
            </div>
        </div>
    </AppCard>
</template>

<script setup>
import { ref } from 'vue'
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import PhPokerChipFill from '@/components/icons/PhPokerChipFill.vue'
import { useAppStore } from '~/store/app'
import { useGameStore } from '~/store/game'
import { useCreditStore } from '~/store/credits'

// Using stores
const appStore = useAppStore()
const gameStore = useGameStore()
const creditStore = useCreditStore()

// Credits states
const currentlyCreditsSet = ref(0)
const currentCredits = computed(() => creditStore.getCredits)

// Set credits if you have enough
const setCredits = (creditsToBeSet) => {
    if (currentCredits.value > creditsToBeSet) {
        currentlyCreditsSet.value = creditsToBeSet
    }
}

// Set credits and start game
const startGame = () => {
    const newBet = currentlyCreditsSet.value
    if (newBet > 0) {
        creditStore.subtractCredits(newBet)
        gameStore.setBet(newBet)
        gameStore.startGame()
    }
}
</script>
