<template>
    <div class="flex flex-col items-center">
        <p>Currently set: {{ currentlyCreditsSet }} credits.</p>
        <p>You have {{ currentCredits }} credits.</p>
    </div>
</template>

<script setup>
import { useCreditStore } from '~/store/credits'
import { useGameStore } from '~/store/game'

// Using stores
const creditStore = useCreditStore()
const gameStore = useGameStore()

// Credits states
const currentCredits = computed(() => creditStore.getCredits)
const currentlyCreditsSet = computed(() => gameStore.getPlayersBet)
</script>
