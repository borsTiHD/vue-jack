<template>
    <AppModal v-model="showModal">
        <template #header>{{ gameResults.title }}</template>
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
import AppModal from '@/components/misc/AppModal.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useGameStore } from '~/store/game'

// Using game store
const gameStore = useGameStore()

// Game result data
const showModal = ref(false) // Modal state
const showResult = computed(() => gameStore.getShowResults) // Show results
const gameResults = computed(() => gameStore.getGameResults) // Result of game

// Watcher for game result
watch(showResult, (newValue) => {
    if (newValue) {
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
