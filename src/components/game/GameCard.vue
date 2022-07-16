<template>
    <div class="card-face">
        <img
            :src="`/img/cards/${getCardName}.png`"
            :alt="getCardName"
            class="card-image w-full h-48 object-cover rounded-lg drop-shadow-lg"
            loading="lazy"
        >
    </div>
</template>

<script setup>
const props = defineProps({
    card: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

// Returns the name of the card
// or if hidden, the name of the back card
const getCardName = computed(() => props.card.hidden ? 'BACK' : props.card.name)
</script>
