<template>
    <div
        :class="[
            'bg-black/10 dark:bg-black/20 flex flex-col rounded-lg p-4',
            cardHover ? 'hover:bg-black/20 hover:dark:bg-white/20' : '',
            cardTransition ? 'transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105' : ''
        ]"
    >
        <!-- Image - only renders if img is given -->
        <div
            v-if="img"
            :class="[
                'card-image-container w-full h-48',
                imageClickable ? 'cursor-pointer' : '',
            ]"
            @click="imageClickable && imageClicked()"
        >
            <img
                :src="props.img"
                height="100%"
                :class="[
                    'card-image w-full h-48 object-cover rounded-lg drop-shadow-lg',
                    imageHover ? 'hover:object-scale-down' : ''
                ]"
                loading="lazy"
            >
        </div>

        <!-- Header - only renders if slot is given -->
        <h1 v-if="hasHeaderSlot" class="card-header font-roboto text-3xl md:text-4xl my-2">
            <slot name="header" />
        </h1>

        <!-- Content - Default slot -->
        <div class="card-content">
            <slot />
        </div>

        <!-- Footer - If slot is given -->
        <div v-if="hasFooterSlot" class="card-footer mt-auto">
            <AppDivider />
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup>
import { useSlots } from 'vue'
import AppDivider from '@/components/misc/AppDivider.vue'
const slots = useSlots()

// Checking if slots are given
const hasHeaderSlot = !!slots.header
const hasFooterSlot = !!slots.footer

// Emit Image clicked event
const emit = defineEmits(['image-clicked'])
const imageClicked = () => emit('image-clicked')

// Props
const props = defineProps({
    cardHover: {
        type: Boolean,
        default: false
    },
    cardTransition: {
        type: Boolean,
        default: false
    },
    img: {
        type: [String, Boolean],
        default: false
    },
    imageHover: {
        type: Boolean,
        default: false
    },
    imageClickable: {
        type: Boolean,
        default: false
    }
})
</script>
