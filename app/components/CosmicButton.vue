<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'

type Variant = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
type Size    = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?:  Variant
  size?:     Size
  disabled?: boolean
  loading?:  boolean
  class?:    string
}>(), {
  variant:  'default',
  size:     'md',
  disabled: false,
  loading:  false,
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const baseClasses = `
  relative inline-flex items-center justify-center gap-2
  font-display font-semibold tracking-wider uppercase
  clip-corners-sm cosmic-transition
  disabled:opacity-40 disabled:cursor-not-allowed
  focus-visible:outline-none
  overflow-hidden
`

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-[10px]',
  md: 'px-6 py-2.5 text-xs',
  lg: 'px-8 py-3.5 text-sm',
}

const variantClasses: Record<Variant, string> = {
  default: `
    border border-cosmic-border bg-cosmic-surface/60
    text-cosmic-primary hover:border-cosmic-cyan/50 hover:bg-cosmic-mid/80
    hover:shadow-cosmic-sm
  `,
  primary: `
    border border-cosmic-cyan/40 bg-btn-primary
    text-cosmic-cyan hover:border-cosmic-cyan/70 hover:shadow-cosmic
    hover:text-white
  `,
  secondary: `
    border border-cosmic-violet/40 bg-gradient-to-br from-cosmic-purple/15 to-cosmic-violet/10
    text-cosmic-violet hover:border-cosmic-violet/70 hover:shadow-cosmic-purple
    hover:text-white
  `,
  danger: `
    border border-cosmic-red/40 bg-btn-danger
    text-cosmic-red hover:border-cosmic-red/70 hover:shadow-cosmic-red
    hover:text-white
  `,
  success: `
    border border-cosmic-green/40 bg-gradient-to-br from-cosmic-green/10 to-cosmic-teal/10
    text-cosmic-green hover:border-cosmic-green/70 hover:shadow-cosmic-green
    hover:text-white
  `,
  ghost: `
    border border-transparent bg-transparent
    text-cosmic-secondary hover:text-cosmic-cyan hover:border-cosmic-border
  `,
}

const classes = computed(() =>
  twMerge(baseClasses, sizeClasses[props.size], variantClasses[props.variant], props.class)
)

function onClick(e: MouseEvent) {
  if (!props.disabled && !props.loading) emit('click', e)
}
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <!-- Shimmer overlay on hover -->
    <span
      class="pointer-events-none absolute inset-0 animate-shimmer opacity-0 hover:opacity-100"
      aria-hidden="true"
    />

    <!-- Corner accents -->
    <span class="pointer-events-none absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-60" aria-hidden="true" />
    <span class="pointer-events-none absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-current opacity-60" aria-hidden="true" />
    <span class="pointer-events-none absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-current opacity-60" aria-hidden="true" />
    <span class="pointer-events-none absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-60" aria-hidden="true" />

    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>

    <slot />
  </button>
</template>