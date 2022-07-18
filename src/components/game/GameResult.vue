<template>
    <AppModal v-model="showModal">
        <template #header>{{ gameResults.title }}</template>
        <template #content>
            <div class="flex flex-col">
                <p class="text-xl">{{ gameResults.message }}</p>
                <p class="mb-2">{{ profitMessage }}</p>
                <p>Dealer: {{ gameResults.dealerSum }}</p>
                <p>You: {{ gameResults.playerSum }}</p>
            </div>
        </template>
        <template #footer>
            <AppButton class="font-montserrat ml-2" @click="nextGame">Next Game</AppButton>
        </template>
    </AppModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppModal from '@/components/misc/AppModal.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useGameStore } from '~/store/game'
import { useCreditStore } from '~/store/credits'

// Using stores
const gameStore = useGameStore()
const creditStore = useCreditStore()

// Game result data
const showModal = ref(false) // Modal state
const profitMessage = ref('') // Modal state
const showResult = computed(() => gameStore.getShowResults) // Show results
const playersBet = computed(() => gameStore.getPlayersBet) // Players bet
const gameResults = computed(() => gameStore.getGameResults) // Result of game

// Watcher for game result and pays out the profit
watch(showResult, (newValue) => {
    if (newValue) {
        // After game is over, show modal
        showModal.value = true

        // Pay out profit
        if (gameResults.value.win === 'blackjack') {
            const profit = playersBet.value * 2.5
            creditStore.addCredits(profit)
            profitMessage.value = `You won ${profit} credits!`
        } else if (gameResults.value.win === 'tie') {
            const profit = playersBet.value
            creditStore.addCredits(profit)
            profitMessage.value = `You get your credits back: ${profit}!`
        } else if (gameResults.value.win === true) {
            const profit = playersBet.value * 2
            creditStore.addCredits(profit)
            profitMessage.value = `You won ${profit} credits!`
        } else if (gameResults.value.win === false) {
            const lostCredits = playersBet.value
            profitMessage.value = `You lose your bet: ${lostCredits} credits!`
        }
    }
})

// Emit next game event
const emit = defineEmits(['next-game'])
const nextGame = () => {
    showModal.value = false
    emit('next-game')
}
</script>
