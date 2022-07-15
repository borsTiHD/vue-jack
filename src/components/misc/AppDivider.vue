
<template>
    <div
        :class="[
            vertical ? 'border-r pr-2 mr-2' : 'border-t pt-2 mt-2',
            colorSets[props.colorSet],
        ]"
    />
</template>

<script setup>
const colorSets = {
    default: 'border-gray-400 dark:border-gray-500'
}

// Props
const props = defineProps({
    colorSet: {
        type: String,
        default: 'default'
    },
    vertical: {
        type: Boolean,
        default: false
    }
})
</script>
