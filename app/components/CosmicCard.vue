<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'

type Variant = 'default' | 'primary' | 'danger' | 'success' | 'warning'

const props = withDefaults(defineProps<{
  title?:        string
  subtitle?:     string
  variant?:      Variant
  hoverable?:    boolean
  class?:        string
  headerClass?:  string
  bodyClass?:    string
  footerClass?:  string
}>(), {
  variant:   'default',
  hoverable: false,
})

const accentColor: Record<Variant, string> = {
  default: 'rgba(0,245,255,0.35)',
  primary: 'rgba(0,245,255,0.55)',
  danger:  'rgba(255,59,92,0.55)',
  success: 'rgba(0,255,136,0.55)',
  warning: 'rgba(255,170,0,0.55)',
}

const borderColor: Record<Variant, string> = {
  default: 'rgba(0,245,255,0.15)',
  primary: 'rgba(0,245,255,0.3)',
  danger:  'rgba(255,59,92,0.3)',
  success: 'rgba(0,255,136,0.3)',
  warning: 'rgba(255,170,0,0.3)',
}

const glowColor: Record<Variant, string> = {
  default: '',
  primary: '0 0 30px rgba(0,245,255,0.1)',
  danger:  '0 0 30px rgba(255,59,92,0.1)',
  success: '0 0 30px rgba(0,255,136,0.1)',
  warning: '0 0 30px rgba(255,170,0,0.1)',
}

const wrapperStyle = computed(() => ({
  borderColor: borderColor[props.variant],
  boxShadow: [
    `inset 0 0 30px rgba(0,0,0,0.3)`,
    glowColor[props.variant],
  ].filter(Boolean).join(', '),
}))

const topBarStyle = computed(() => ({
  background: `linear-gradient(90deg, ${accentColor[props.variant]}, transparent)`,
}))

const classes = computed(() =>
  twMerge(
    'relative bg-card-surface border clip-corners-all overflow-hidden',
    props.hoverable && 'cosmic-transition hover:-translate-y-0.5 hover:border-opacity-60',
    props.class
  )
)
</script>

<template>
  <div :class="classes" :style="wrapperStyle">
    <!-- Top accent bar -->
    <div class="h-px w-full" :style="topBarStyle" />

    <!-- SVG corner decorations -->
    <svg class="absolute top-0 right-0 w-8 h-8 opacity-40" viewBox="0 0 32 32" fill="none">
      <path d="M32 0 L32 16 L16 32" stroke="currentColor" stroke-width="0.5" class="text-cosmic-cyan"/>
      <circle cx="32" cy="0" r="2" fill="currentColor" class="text-cosmic-cyan"/>
    </svg>
    <svg class="absolute bottom-0 left-0 w-8 h-8 opacity-40" viewBox="0 0 32 32" fill="none">
      <path d="M0 32 L0 16 L16 0" stroke="currentColor" stroke-width="0.5" class="text-cosmic-cyan"/>
      <circle cx="0" cy="32" r="2" fill="currentColor" class="text-cosmic-cyan"/>
    </svg>

    <!-- Header -->
    <div
      v-if="title || $slots.header"
      :class="twMerge('px-5 pt-4 pb-3 border-b border-cosmic-border', headerClass)"
    >
      <slot name="header">
        <h3 v-if="title" class="text-display text-sm font-semibold text-cosmic-primary tracking-widest uppercase">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="mt-0.5 text-xs text-cosmic-muted font-mono">
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <!-- Body -->
    <div :class="twMerge('px-5 py-4', bodyClass)">
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      :class="twMerge('px-5 pt-3 pb-4 border-t border-cosmic-border', footerClass)"
    >
      <slot name="footer" />
    </div>
  </div>
</template>