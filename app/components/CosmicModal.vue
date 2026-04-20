<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?:     string
  size?:      'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?:  boolean
}>(), {
  size:     'md',
  closable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const sizeClasses: Record<string, string> = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw]',
}

function close() {
  if (props.closable) {
    emit('update:modelValue', false)
    emit('close')
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-cosmic-void/80 backdrop-blur-sm"
          @click="close"
        />

        <!-- Scanline overlay -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px);"
        />

        <!-- Panel -->
        <Transition
          enter-active-class="transition duration-200"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            :class="['relative w-full clip-corners-all bg-cosmic-deep border border-cosmic-border shadow-cosmic-lg', sizeClasses[size]]"
            style="box-shadow: 0 0 60px rgba(0,245,255,0.15), inset 0 0 40px rgba(0,0,0,0.4);"
          >
            <!-- Top accent -->
            <div class="h-px w-full bg-gradient-to-r from-cosmic-cyan/60 via-cosmic-blue/30 to-transparent" />

            <!-- Corner SVG deco -->
            <svg class="absolute top-0 right-0 w-10 h-10 text-cosmic-cyan opacity-50" viewBox="0 0 40 40" fill="none">
              <path d="M40 0 L40 20 L20 40" stroke="currentColor" stroke-width="0.5"/>
              <circle cx="40" cy="0" r="2.5" fill="currentColor"/>
            </svg>

            <!-- Header -->
            <div v-if="title || $slots.header" class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-cosmic-border">
              <slot name="header">
                <h2 class="text-display text-sm font-bold tracking-widest uppercase text-cosmic-cyan">
                  {{ title }}
                </h2>
              </slot>
              <button
                v-if="closable"
                class="text-cosmic-muted hover:text-cosmic-cyan cosmic-transition p-1 rounded"
                aria-label="Close modal"
                @click="close"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 pb-5 pt-4 border-t border-cosmic-border flex items-center justify-end gap-3">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>