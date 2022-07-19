<template>
    <div class="flex flex-col text-gray-900 dark:text-white">
        <section id="rules" class="flex justify-center p-4 md:p-8">
            <AppCard class="max-w-2xl">
                <div class="flex flex-col items-center mb-2">
                    <p class="text-4xl md:text-5xl mb-4">♠️♥️ Game rules ♦️♣️</p>
                </div>
                <div class="flex flex-col mb-4">
                    <p>Since this is a simple implementation, only the basic rules have been adopted.</p>
                    <p>You play against the dealer. Your goal is to reach a higher card value than the dealer, but not to exceed 21.</p>
                </div>
                <div class="flex flex-col mb-4">
                    <p class="text-4xl md:text-3xl">♠️ Gameplay</p>
                    <ul class="list-disc list-inside">
                        <li>The game is played with a deck of 52 cards.</li>
                        <li>The deck is shuffled three times before the game starts.</li>
                        <li>The dealer deals two cards to the player and two cards to the dealer.</li>
                        <li>If the player gets an ace and a 10 card, he gets a blackjack and wins immediately.</li>
                        <li>The player can choose to hit or stand.</li>
                        <li>If the player stayed, the dealer will hit until the total is 17 or higher.</li>
                    </ul>
                </div>
                <div class="flex flex-col mb-4">
                    <p class="text-4xl md:text-3xl">♥️ Betting</p>
                    <ul class="list-disc list-inside">
                        <li>You start with 500 credits.</li>
                        <li>You can bet with 10, 25, 50, or 100 credits and only once per round.</li>
                        <li>If you lose the round, you lose your entire bet.</li>
                        <li>If you win, you will receive double your bet as a payout.</li>
                        <li>If you win with a Blackjack, you will receive 2.5 times your bet.</li>
                        <li>In case of a draw, you will get your bet back.</li>
                        <li>If you don't have enough credits, you can reset the game.</li>
                    </ul>
                </div>
                <div class="flex flex-col mb-4">
                    <p class="text-4xl md:text-3xl">♦️ Card values</p>
                    <ul class="list-disc list-inside">
                        <li>Ace is worth 1 or 11 points.</li>
                        <li>Jack, Queen and King are worth 10 points.</li>
                        <li>All other cards are worth their face value.</li>
                    </ul>
                </div>
                <div class="flex flex-col mb-4">
                    <p class="text-4xl md:text-3xl">♣️ Other</p>
                    <ul class="list-disc list-inside">
                        <li>Splitting is currently not implemented.</li>
                        <li>Doubling Down is currently not implemented.</li>
                        <li>Insurance is currently not implemented.</li>
                        <li>Possibly the features will be included in the future.</li>
                    </ul>
                </div>
                <div class="grid grid-cols-1 gap-4 mt-4">
                    <NuxtLink :to="'/'" class="col-span-1"><AppButton class="font-montserrat w-full" uppercase>Go Back</AppButton></NuxtLink>
                </div>
            </AppCard>
        </section>
    </div>
</template>

<script setup>
import AppCard from '@/components/misc/AppCard.vue'
import AppButton from '@/components/misc/AppButton.vue'
import { useAppStore } from '~/store/app'

// Changing title
const appStore = useAppStore()
const pageTitle = `Rules - ${appStore.getTitle}`
useHead({ title: pageTitle })
</script>
