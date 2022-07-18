<template>
    <div class="w-full relative cursor-pointer transition ease-in-out duration-200 hover:scale-110 font-montserrat select-none">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph h-18 w-18 md:h-24 md:w-24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
            <path d="M202.2 200.8a103.8 103.8 0 0 0 0-145.6a2.3 2.3 0 0 0-.7-.7a2.3 2.3 0 0 0-.7-.7a103.8 103.8 0 0 0-145.6 0a2.3 2.3 0 0 0-.7.7a2.3 2.3 0 0 0-.7.7a103.8 103.8 0 0 0 0 145.6l.7.7a2.3 2.3 0 0 0 .7.7a103.8 103.8 0 0 0 145.6 0a2.3 2.3 0 0 0 .7-.7a2.3 2.3 0 0 0 .7-.7ZM40.4 136h24.1a63.6 63.6 0 0 0 13 31.2l-17.1 17.1a87.5 87.5 0 0 1-20-48.3Zm20-64.3l17.1 17.1a63.6 63.6 0 0 0-13 31.2H40.4a87.5 87.5 0 0 1 20-48.3ZM215.6 120h-24.1a63.6 63.6 0 0 0-13-31.2l17.1-17.1a87.5 87.5 0 0 1 20 48.3Zm-48.4-42.5a63.6 63.6 0 0 0-31.2-13V40.4a87.5 87.5 0 0 1 48.3 20Zm-47.2-13a63.6 63.6 0 0 0-31.2 13L71.7 60.4a87.5 87.5 0 0 1 48.3-20Zm-31.2 114a63.6 63.6 0 0 0 31.2 13v24.1a87.5 87.5 0 0 1-48.3-20Zm47.2 13a63.6 63.6 0 0 0 31.2-13l17.1 17.1a87.5 87.5 0 0 1-48.3 20Zm42.5-24.3a63.6 63.6 0 0 0 13-31.2h24.1a87.5 87.5 0 0 1-20 48.3Z" />
        </svg>
        <span class="absolute inset-0 text-2xl flex items-center justify-center">{{ props.value }}</span>
    </div>
</template>

<script setup>
// Icon: poker-chip-fill
// https://icones.js.org/collection/all?s=poker
const props = defineProps({
    value: {
        type: Number,
        default: 0
    }
})
</script>
