<template>
    <div class="game-score bg-black/10 dark:bg-black/20 rounded-full mx-2 w-10 h-10 grid place-content-center">
        {{ props.score }}
    </div>
</template>

<script setup>
const props = defineProps({
    score: {
        type: Number,
        required: true,
        default: 0
    }
})
</script>
