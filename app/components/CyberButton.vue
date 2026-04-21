<template>
  <button
    type="button"
    class="cyber-btn"
    :class="[
      { 'is-active': active },
      { 'idle-glitch': idleGlitch }
    ]"
    :style="cssVars"
    @click="$emit('click', $event)"
  >
    <span v-if="prefix" aria-hidden="true">{{ prefix }}</span>
    {{ label }}

    <span class="cyber-btn__glitch" aria-hidden="true">
      {{ glitchText || label }}
    </span>

    <span v-if="tag" class="number">{{ tag }}</span>
  </button>
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
  name: 'CyberButton',
  emits: ['click'],
  props: {
    label: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'blue'
    },
    active: {
      type: Boolean,
      default: false
    },
    idleGlitch: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    glitchText: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '9px'
    },
    width: {
      type: String,
      default: '84px'
    },
    height: {
      type: String,
      default: '38px'
    }
  },
  computed: {
    palette() {
      return VARIANTS[this.variant] || VARIANTS.blue
    },
    cssVars() {
      return {
        '--primary': this.active ? this.palette.active : this.palette.primary,
        '--shadow-primary': this.active ? this.palette.activeShadow : this.palette.shadowPrimary,
        '--hover-primary': this.palette.hover,
        '--active-primary': this.palette.active,
        '--active-shadow-primary': this.palette.activeShadow,
        '--font-size': this.fontSize,
        '--btn-width': this.width,
        '--btn-height': this.height
      }
    }
  }
}
</script>

<style scoped>
.cyber-btn {
  --primary: #3b82f6;
  --shadow-primary: #bfdbfe;
  --hover-primary: #2563eb;
  --active-primary: #1d4ed8;
  --active-shadow-primary: #93c5fd;
  --color: white;
  --font-size: 12px;
  --btn-width: 84px;
  --btn-height: 38px;
  --shadow-primary-hue: 180;
  --shadow-secondary-hue: 60;
  --shadow-secondary: hsl(var(--shadow-secondary-hue), 90%, 60%);
  --clip: polygon(11% 0, 95% 0, 100% 25%, 90% 90%, 95% 90%, 85% 90%, 85% 100%, 7% 100%, 0 80%);
  --border: 5px;
  --shimmy-distance: 5;
  --clip-one: polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%);
  --clip-two: polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%);
  --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%);
  --clip-four: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
  --clip-five: polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
  --clip-six: polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%);
  --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%);

  position: relative;
  z-index: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: auto;
  min-width: var(--btn-width);
  height: var(--btn-height);

  padding: 0 18px;

  border: 0;
  background: transparent;
  color: var(--color);

  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 900;

  white-space: nowrap;
  line-height: normal;

  text-align: center;
  cursor: pointer;
  transition: 0.2s, 0.3s;
}

.cyber-btn:hover {
  --primary: var(--hover-primary);
  --font-size: 11px;
}

.cyber-btn.is-active {
  --primary: var(--active-primary);
  --shadow-primary: var(--active-shadow-primary);
}

.cyber-btn::before,
.cyber-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: var(--clip);
  z-index: -1;
}

.cyber-btn::before {
  background: var(--shadow-primary);
  transform: translate(var(--border), 0);
}

.cyber-btn::after {
  background: var(--primary);
}

.cyber-btn__glitch {
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

.cyber-btn__glitch::before {
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

.cyber-btn.idle-glitch .cyber-btn__glitch {
  display: block;
  animation: glitch 2s infinite;
}

.cyber-btn:hover .cyber-btn__glitch {
  display: block;
  animation: glitch 2s infinite;
}

.cyber-btn.is-active .cyber-btn__glitch {
  display: block;
  animation: glitch 5s infinite;
}

.number {
  position: absolute;
  top: 0;
  left: 81%;
  width: 15px;
  height: 6px;
  line-height: 6.2px;
  background: var(--shadow-primary);
  color: #323232;
  font-size: 5.5px;
  font-weight: 700;
  letter-spacing: 1px;
}

@keyframes glitch {
  0% {
    clip-path: var(--clip-one);
  }

  2%,
  8% {
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

  14%,
  21% {
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

  35%,
  45% {
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

  31%,
  61%,
  100% {
    clip-path: var(--clip-four);
  }
}
</style>