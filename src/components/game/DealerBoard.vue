<template>
    <AppCard class="pt-2">
        <div class="flex flex-col">
            <div class="flex flex-row items-center mb-2">
                <p>Dealer:</p>
                <DisplayScore :score="dealerSum" />
            </div>
            <!-- Dealer cards -->
            <TransitionGroup v-if="dealerCards" name="cards" tag="div" class="flex flex-row mx-auto">
                <GameCard v-for="(card, index) in dealerCards" :key="index + card.name" :card="card" :class="dealerCards.length > index + 1 ? '-mr-16' : ''" />
            </TransitionGroup>
        </div>
    </AppCard>
</template>

<script setup>
import AppCard from '@/components/misc/AppCard.vue'
import GameCard from '@/components/game/GameCard.vue'
import DisplayScore from '@/components/game/DisplayScore.vue'
import { useGameStore } from '~/store/game'

// Using game store
const gameStore = useGameStore()

// Dealer cards + Dealer sum (without hidden card)
const dealerCards = computed(() => gameStore.getDealerCards)
const dealerSum = computed(() => gameStore.getDealerSum)
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
