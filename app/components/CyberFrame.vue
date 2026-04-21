<template>
  <div
    class="cyber-frame"
    :class="[
      `tone-${resolvedTone}`,
      { 'is-active': active },
      { 'is-disabled': disabled }
    ]"
    :style="cssVars"
  >
    <div v-if="label || tag" class="cyber-frame__header">
      <span v-if="label" class="cyber-frame__label">{{ label }}</span>
      <span v-if="tag" class="cyber-frame__tag">{{ tag }}</span>
    </div>

    <div class="cyber-frame__body">
      <slot />
    </div>
  </div>
</template>

<script>
const VARIANTS = {
  slate: {
    edge: '#475569',
    glow: '#cbd5e1',
    hover: '#334155',
    active: '#1e293b',
    activeGlow: '#94a3b8'
  },
  gray: {
    edge: '#6b7280',
    glow: '#e5e7eb',
    hover: '#4b5563',
    active: '#374151',
    activeGlow: '#d1d5db'
  },
  zinc: {
    edge: '#52525b',
    glow: '#e4e4e7',
    hover: '#3f3f46',
    active: '#27272a',
    activeGlow: '#d4d4d8'
  },
  red: {
    edge: '#ef4444',
    glow: '#fecaca',
    hover: '#dc2626',
    active: '#b91c1c',
    activeGlow: '#fca5a5'
  },
  orange: {
    edge: '#f97316',
    glow: '#fed7aa',
    hover: '#ea580c',
    active: '#c2410c',
    activeGlow: '#fdba74'
  },
  amber: {
    edge: '#f59e0b',
    glow: '#fde68a',
    hover: '#d97706',
    active: '#b45309',
    activeGlow: '#fcd34d'
  },
  yellow: {
    edge: '#eab308',
    glow: '#fef08a',
    hover: '#ca8a04',
    active: '#a16207',
    activeGlow: '#fde047'
  },
  lime: {
    edge: '#84cc16',
    glow: '#d9f99d',
    hover: '#65a30d',
    active: '#4d7c0f',
    activeGlow: '#bef264'
  },
  green: {
    edge: '#22c55e',
    glow: '#bbf7d0',
    hover: '#16a34a',
    active: '#15803d',
    activeGlow: '#86efac'
  },
  emerald: {
    edge: '#10b981',
    glow: '#a7f3d0',
    hover: '#059669',
    active: '#047857',
    activeGlow: '#6ee7b7'
  },
  teal: {
    edge: '#14b8a6',
    glow: '#99f6e4',
    hover: '#0f766e',
    active: '#115e59',
    activeGlow: '#5eead4'
  },
  cyan: {
    edge: '#06b6d4',
    glow: '#a5f3fc',
    hover: '#0891b2',
    active: '#0e7490',
    activeGlow: '#67e8f9'
  },
  sky: {
    edge: '#0ea5e9',
    glow: '#bae6fd',
    hover: '#0284c7',
    active: '#0369a1',
    activeGlow: '#7dd3fc'
  },
  blue: {
    edge: '#3b82f6',
    glow: '#bfdbfe',
    hover: '#2563eb',
    active: '#1d4ed8',
    activeGlow: '#93c5fd'
  },
  indigo: {
    edge: '#6366f1',
    glow: '#c7d2fe',
    hover: '#4f46e5',
    active: '#4338ca',
    activeGlow: '#a5b4fc'
  },
  violet: {
    edge: '#8b5cf6',
    glow: '#ddd6fe',
    hover: '#7c3aed',
    active: '#6d28d9',
    activeGlow: '#c4b5fd'
  },
  purple: {
    edge: '#a855f7',
    glow: '#e9d5ff',
    hover: '#9333ea',
    active: '#7e22ce',
    activeGlow: '#d8b4fe'
  },
  fuchsia: {
    edge: '#d946ef',
    glow: '#f5d0fe',
    hover: '#c026d3',
    active: '#a21caf',
    activeGlow: '#f0abfc'
  },
  pink: {
    edge: '#ec4899',
    glow: '#fbcfe8',
    hover: '#db2777',
    active: '#be185d',
    activeGlow: '#f9a8d4'
  },
  rose: {
    edge: '#f43f5e',
    glow: '#fecdd3',
    hover: '#e11d48',
    active: '#be123c',
    activeGlow: '#fda4af'
  },
  black: {
    edge: 'rgba(0, 0, 0, 0.8)',
    glow: 'rgba(255, 255, 255, 0.08)',
    hover: 'rgba(0, 0, 0, 0.9)',
    active: 'rgba(0, 0, 0, 0.95)',
    activeGlow: 'rgba(255, 255, 255, 0.12)'
  }
}

export default {
  name: 'CyberFrame',
  props: {
    variant: {
      type: String,
      default: 'blue'
    },
    tone: {
      type: String,
      default: 'solid',
      validator: value => ['solid', 'glass', 'outline'].includes(value)
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    padding: {
      type: String,
      default: '16px'
    },
    cornerInset: {
      type: String,
      default: '6px'
    },
    bevelSize: {
      type: String,
      default: '10px'
    },
    rightCut: {
      type: String,
      default: '12px'
    },
    bottomLeftCut: {
      type: String,
      default: '10px'
    },
    shadowOffset: {
      type: String,
      default: '3px'
    },
    minHeight: {
      type: String,
      default: 'unset'
    }
  },
  computed: {
    resolvedVariant() {
      return VARIANTS[this.variant] ? this.variant : 'blue'
    },
    resolvedTone() {
      return ['solid', 'glass', 'outline'].includes(this.tone) ? this.tone : 'solid'
    },
    palette() {
      return VARIANTS[this.resolvedVariant]
    },
    fillColor() {
      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.8)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.edge
    },
    hoverFillColor() {
      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.9)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.hover
    },
    activeFillColor() {
      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.95)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.active
    },
    edgeGlowColor() {
      if (this.resolvedTone === 'glass' || this.resolvedTone === 'outline') {
        if (this.resolvedVariant === 'black') {
          return 'rgba(255, 255, 255, 0.12)'
        }
        return this.palette.edge
      }

      return this.palette.glow
    },
    activeGlowColor() {
      if (this.resolvedTone === 'glass' || this.resolvedTone === 'outline') {
        if (this.resolvedVariant === 'black') {
          return 'rgba(255, 255, 255, 0.18)'
        }
        return this.palette.active
      }

      return this.palette.activeGlow
    },
    cssVars() {
      return {
        '--fill': this.active ? this.activeFillColor : this.fillColor,
        '--fill-hover': this.hoverFillColor,
        '--glow': this.active ? this.activeGlowColor : this.edgeGlowColor,
        '--frame-padding': this.padding,
        '--corner-inset': this.cornerInset,
        '--bevel-size': this.bevelSize,
        '--right-cut': this.rightCut,
        '--bottom-left-cut': this.bottomLeftCut,
        '--shadow-offset': this.shadowOffset,
        '--frame-min-height': this.minHeight
      }
    }
  }
}
</script>

<style scoped>
.cyber-frame {
  --fill: #3b82f6;
  --fill-hover: #2563eb;
  --glow: #bfdbfe;
  --frame-padding: 16px;
  --corner-inset: 6px;
  --bevel-size: 10px;
  --right-cut: 12px;
  --bottom-left-cut: 10px;
  --shadow-offset: 3px;
  --frame-min-height: unset;

  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  min-height: var(--frame-min-height);
  padding: var(--frame-padding);
  color: white;
  box-sizing: border-box;

  --clip: polygon(
    var(--corner-inset) 0,
    calc(100% - var(--bevel-size)) 0,
    100% var(--bevel-size),
    100% calc(100% - var(--right-cut)),
    calc(100% - var(--right-cut)) 100%,
    var(--bottom-left-cut) 100%,
    0 calc(100% - var(--bottom-left-cut)),
    0 var(--corner-inset)
  );
}

.cyber-frame.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.cyber-frame::before,
.cyber-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: var(--clip);
  z-index: -1;
}

.cyber-frame::before {
  background: var(--glow);
  transform: translate(var(--shadow-offset), 0);
  filter: blur(0.35px);
}

.cyber-frame::after {
  background: var(--fill);
}

/* .cyber-frame:hover::after {
  background: var(--fill-hover);
} */

.cyber-frame.tone-glass,
.cyber-frame.tone-outline {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cyber-frame.tone-outline::after {
  background: transparent;
}

.cyber-frame__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.cyber-frame__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cyber-frame__tag {
  background: var(--glow);
  color: #111;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  padding: 3px 6px;
  white-space: nowrap;
}

.cyber-frame__body {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
}
</style>