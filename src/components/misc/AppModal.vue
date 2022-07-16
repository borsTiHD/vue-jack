<template>
    <!-- Modal -->
    <div
        v-show="open"
        tabindex="-1"
        aria-hidden="true"
        class="modal fixed inset-0 w-full h-screen bg-black/60 dark:bg-black/70 flex z-50"
    >
        <!-- Text Modal -->
        <div class="modal-container p-4 w-full max-w-2xl m-auto">
            <div class="modal-body relative rounded-lg shadow bg-neutral-100 dark:bg-neutral-800">
                <!-- Modal header -->
                <div v-if="hasHeaderSlot" class="modal-header flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                    <h3 class="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
                        <slot name="header" />
                    </h3>
                    <button type="button" class="bg-transparent hover:bg-black/10 dark:hover:bg-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" @click="closeModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>
                </div>

                <!-- Modal content -->
                <div v-if="hasContentSlot" class="modal-content p-6 space-y-6">
                    <slot name="content" />
                </div>

                <!-- Modal footer -->
                <div v-if="hasFooterSlot" class="modal-footer flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Prop: v-model for showing the modal
// If image is set, it will render the image instead of the content
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

// Emit Events
const emit = defineEmits(['update:modelValue'])

// State for the modal to be shown
const open = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// Modal control
const closeModal = () => { open.value = false }

// Checking if slots are given
const slots = useSlots()
const hasHeaderSlot = !!slots.header
const hasContentSlot = !!slots.content
const hasFooterSlot = !!slots.footer
</script>
