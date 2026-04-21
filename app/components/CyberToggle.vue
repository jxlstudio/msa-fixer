<template>
  <label
    class="cyber-checkbox"
    :class="[
      { 'is-checked': modelValue },
      { 'idle-glitch': idleGlitch },
      { 'is-disabled': disabled }
    ]"
    :style="cssVars"
  >
    <input
      class="cyber-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <span class="cyber-checkbox__box" aria-hidden="true">
      <span class="cyber-checkbox__mark">✓</span>
      <span class="cyber-checkbox__glitch">
        <span class="cyber-checkbox__mark cyber-checkbox__mark--glitch">✓</span>
      </span>
      <span v-if="tag" class="cyber-checkbox__tag">{{ tag }}</span>
    </span>

    <span v-if="label" class="cyber-checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script>
const VARIANTS = {
  slate: {
    primary: '#475569',
    shadowPrimary: '#cbd5e1',
    hover: '#334155',
    active: '#1e293b',
    activeShadow: '#94a3b8'
  },
  gray: {
    primary: '#6b7280',
    shadowPrimary: '#e5e7eb',
    hover: '#4b5563',
    active: '#374151',
    activeShadow: '#d1d5db'
  },
  zinc: {
    primary: '#52525b',
    shadowPrimary: '#e4e4e7',
    hover: '#3f3f46',
    active: '#27272a',
    activeShadow: '#d4d4d8'
  },
  red: {
    primary: '#ef4444',
    shadowPrimary: '#fecaca',
    hover: '#dc2626',
    active: '#b91c1c',
    activeShadow: '#fca5a5'
  },
  orange: {
    primary: '#f97316',
    shadowPrimary: '#fed7aa',
    hover: '#ea580c',
    active: '#c2410c',
    activeShadow: '#fdba74'
  },
  amber: {
    primary: '#f59e0b',
    shadowPrimary: '#fde68a',
    hover: '#d97706',
    active: '#b45309',
    activeShadow: '#fcd34d'
  },
  yellow: {
    primary: '#eab308',
    shadowPrimary: '#fef08a',
    hover: '#ca8a04',
    active: '#a16207',
    activeShadow: '#fde047'
  },
  lime: {
    primary: '#84cc16',
    shadowPrimary: '#d9f99d',
    hover: '#65a30d',
    active: '#4d7c0f',
    activeShadow: '#bef264'
  },
  green: {
    primary: '#22c55e',
    shadowPrimary: '#bbf7d0',
    hover: '#16a34a',
    active: '#15803d',
    activeShadow: '#86efac'
  },
  emerald: {
    primary: '#10b981',
    shadowPrimary: '#a7f3d0',
    hover: '#059669',
    active: '#047857',
    activeShadow: '#6ee7b7'
  },
  teal: {
    primary: '#14b8a6',
    shadowPrimary: '#99f6e4',
    hover: '#0f766e',
    active: '#115e59',
    activeShadow: '#5eead4'
  },
  cyan: {
    primary: '#06b6d4',
    shadowPrimary: '#a5f3fc',
    hover: '#0891b2',
    active: '#0e7490',
    activeShadow: '#67e8f9'
  },
  sky: {
    primary: '#0ea5e9',
    shadowPrimary: '#bae6fd',
    hover: '#0284c7',
    active: '#0369a1',
    activeShadow: '#7dd3fc'
  },
  blue: {
    primary: '#3b82f6',
    shadowPrimary: '#bfdbfe',
    hover: '#2563eb',
    active: '#1d4ed8',
    activeShadow: '#93c5fd'
  },
  indigo: {
    primary: '#6366f1',
    shadowPrimary: '#c7d2fe',
    hover: '#4f46e5',
    active: '#4338ca',
    activeShadow: '#a5b4fc'
  },
  violet: {
    primary: '#8b5cf6',
    shadowPrimary: '#ddd6fe',
    hover: '#7c3aed',
    active: '#6d28d9',
    activeShadow: '#c4b5fd'
  },
  purple: {
    primary: '#a855f7',
    shadowPrimary: '#e9d5ff',
    hover: '#9333ea',
    active: '#7e22ce',
    activeShadow: '#d8b4fe'
  },
  fuchsia: {
    primary: '#d946ef',
    shadowPrimary: '#f5d0fe',
    hover: '#c026d3',
    active: '#a21caf',
    activeShadow: '#f0abfc'
  },
  pink: {
    primary: '#ec4899',
    shadowPrimary: '#fbcfe8',
    hover: '#db2777',
    active: '#be185d',
    activeShadow: '#f9a8d4'
  },
  rose: {
    primary: '#f43f5e',
    shadowPrimary: '#fecdd3',
    hover: '#e11d48',
    active: '#be123c',
    activeShadow: '#fda4af'
  }
}

export default {
  name: 'CyberCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'blue'
    },
    idleGlitch: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '28px'
    }
  },
  computed: {
    palette() {
      return VARIANTS[this.variant] || VARIANTS.blue
    },
    cssVars() {
      return {
        '--primary': this.palette.primary,
        '--shadow-primary': this.palette.shadowPrimary,
        '--hover-primary': this.palette.hover,
        '--active-primary': this.palette.active,
        '--active-shadow-primary': this.palette.activeShadow,
        '--checkbox-size': this.size
      }
    }
  }
}
</script>

<style scoped>
.cyber-checkbox {
  --primary: #3b82f6;
  --shadow-primary: #bfdbfe;
  --hover-primary: #2563eb;
  --active-primary: #1d4ed8;
  --active-shadow-primary: #93c5fd;
  --checkbox-size: 28px;
  --shadow-primary-hue: 180;
  --shadow-secondary-hue: 60;
  --shadow-secondary: hsl(var(--shadow-secondary-hue), 90%, 60%);
  --clip: polygon(14% 0, 100% 0, 100% 72%, 86% 100%, 0 100%, 0 24%);
  --border: 4px;
  --shimmy-distance: 5;
  --clip-one: polygon(0 2%, 100% 2%, 100% 92%, 92% 92%, 92% 88%, 82% 88%, 82% 92%, 8% 92%, 0 72%);
  --clip-two: polygon(0 76%, 100% 76%, 100% 100%, 92% 100%, 92% 88%, 82% 88%, 82% 100%, 8% 100%, 0 76%);
  --clip-three: polygon(0 42%, 100% 42%, 100% 56%, 92% 56%, 92% 56%, 82% 56%, 82% 56%, 8% 56%, 0 56%);
  --clip-four: polygon(0 0, 100% 0, 100% 0, 92% 0, 92% 0, 82% 0, 82% 0, 8% 0, 0 0);
  --clip-five: polygon(0 0, 100% 0, 100% 0, 92% 0, 92% 0, 82% 0, 82% 0, 8% 0, 0 0);
  --clip-six: polygon(0 38%, 100% 38%, 100% 84%, 92% 84%, 92% 84%, 82% 84%, 82% 84%, 8% 84%, 0 68%);
  --clip-seven: polygon(0 62%, 100% 62%, 100% 80%, 92% 80%, 92% 80%, 82% 80%, 82% 80%, 8% 80%, 0 68%);

  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.cyber-checkbox.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cyber-checkbox__input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.cyber-checkbox__box {
  position: relative;
  z-index: 0;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cyber-checkbox__box::before,
.cyber-checkbox__box::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: var(--clip);
  z-index: -1;
}

.cyber-checkbox__box::before {
  background: var(--shadow-primary);
  transform: translate(var(--border), 0);
}

.cyber-checkbox__box::after {
  background: var(--primary);
}

.cyber-checkbox:hover .cyber-checkbox__box::after {
  background: var(--hover-primary);
}

.cyber-checkbox.is-checked .cyber-checkbox__box::before {
  background: var(--active-shadow-primary);
}

.cyber-checkbox.is-checked .cyber-checkbox__box::after {
  background: var(--active-primary);
}

.cyber-checkbox__mark {
  position: relative;
  z-index: 2;
  color: #ffffff;
  font-size: calc(var(--checkbox-size) * 0.58);
  font-weight: 900;
  line-height: 1;
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.15s ease, transform 0.15s ease;
  pointer-events: none;
}

.cyber-checkbox.is-checked .cyber-checkbox__mark {
  opacity: 1;
  transform: scale(1);
}

.cyber-checkbox__glitch {
  position: absolute;
  top: calc(var(--border) * -1);
  right: calc(var(--border) * -1);
  bottom: calc(var(--border) * -1);
  left: calc(var(--border) * -1);
  display: none;
  background: var(--shadow-primary);
  text-shadow: 2px 2px var(--shadow-primary), -2px -2px var(--shadow-secondary);
  clip-path: var(--clip);
  animation: none;
  pointer-events: none;
}

.cyber-checkbox__glitch::before {
  content: '';
  position: absolute;
  top: calc(var(--border) * 1);
  right: calc(var(--border) * 1);
  bottom: calc(var(--border) * 1);
  left: calc(var(--border) * 1);
  clip-path: var(--clip);
  background: var(--primary);
  z-index: -1;
}

.cyber-checkbox__mark--glitch {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.cyber-checkbox.is-checked .cyber-checkbox__mark--glitch {
  opacity: 1;
}

.cyber-checkbox.idle-glitch.is-checked .cyber-checkbox__glitch {
  display: block;
  animation: glitch 2s infinite;
}

.cyber-checkbox:hover.is-checked .cyber-checkbox__glitch,
.cyber-checkbox:hover .cyber-checkbox__glitch {
  display: block;
  animation: glitch 2s infinite;
}

.cyber-checkbox.is-checked .cyber-checkbox__glitch {
  background: var(--active-shadow-primary);
}

.cyber-checkbox.is-checked .cyber-checkbox__glitch::before {
  background: var(--active-primary);
}

.cyber-checkbox__tag {
  position: absolute;
  top: 0;
  left: 75%;
  min-width: 14px;
  height: 6px;
  padding: 0 2px;
  line-height: 6.2px;
  background: var(--shadow-primary);
  color: #323232;
  font-size: 5.5px;
  font-weight: 700;
  letter-spacing: 1px;
}

.cyber-checkbox.is-checked .cyber-checkbox__tag {
  background: var(--active-shadow-primary);
}

.cyber-checkbox__label {
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
}

.cyber-checkbox__input:focus-visible + .cyber-checkbox__box {
  outline: 2px solid white;
  outline-offset: 4px;
}

@keyframes glitch {
  0% {
    clip-path: var(--clip-one);
  }

  2%, 8% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }

  6% {
    clip-path: var(--clip-two);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }

  9% {
    clip-path: var(--clip-two);
    transform: translate(0, 0);
  }

  10% {
    clip-path: var(--clip-three);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }

  13% {
    clip-path: var(--clip-three);
    transform: translate(0, 0);
  }

  14%, 21% {
    clip-path: var(--clip-four);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }

  25% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }

  30% {
    clip-path: var(--clip-five);
    transform: translate(calc(var(--shimmy-distance) * -1%), 0);
  }

  35%, 45% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * -1%));
  }

  40% {
    clip-path: var(--clip-six);
    transform: translate(calc(var(--shimmy-distance) * 1%));
  }

  50% {
    clip-path: var(--clip-six);
    transform: translate(0, 0);
  }

  55% {
    clip-path: var(--clip-seven);
    transform: translate(calc(var(--shimmy-distance) * 1%), 0);
  }

  60% {
    clip-path: var(--clip-seven);
    transform: translate(0, 0);
  }

  31%, 61%, 100% {
    clip-path: var(--clip-four);
  }
}
</style>