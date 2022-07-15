<template>
    <button
        :class="[
            'shadow rounded',
            'focus:ring-4 focus:outline-none',
            buttonTypes[props.type],
            buttonSizes[props.size],
            props.uppercase ? 'uppercase' : 'normal-case'
        ]"
        type="button"
    >
        <slot />
    </button>
</template>

<script setup>
const buttonTypes = {
    primary: 'text-white bg-primary-light dark:bg-primary hover:bg-rose-400 dark:hover:bg-rose-400 focus:ring-rose-300/60',
    secondary: 'text-gray-900 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-400 focus:ring-gray-600/60',
    success: 'text-white bg-green-600 hover:bg-green-500 focus:ring-green-300'
}

const buttonSizes = {
    default: 'py-2 px-4',
    small: 'py-1 px-2 text-sm'
}

const props = defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String,
        default: 'default'
    },
    uppercase: {
        type: Boolean,
        default: false
    }
})
</script>
