<template>
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
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import AppModal from '@/components/misc/AppModal.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useGameStore } from '~/store/game'

// Using game store
const gameStore = useGameStore()

// Game result data
const showModal = ref(false) // Modal state
const { getGameRunning } = storeToRefs(gameStore)
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

// Watcher for game result
watch(getGameRunning, (newValue) => {
    if (!newValue) {
        showModal.value = true // After game is over, show modal
    }
})

// Emit next game event
const emit = defineEmits(['next-game'])
const nextGame = () => {
    showModal.value = false
    emit('next-game')
}
</script>
