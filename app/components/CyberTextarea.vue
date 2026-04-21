<template>
  <label
    class="cyber-textarea pb-4"
    :class="[
      `tone-${resolvedTone}`,
      { 'is-active': active || isFocused },
      { 'is-disabled': disabled },
      { 'has-error': error }
    ]"
    :style="cssVars"
  >
    <div v-if="label || tag" class="cyber-textarea__header">
      <span v-if="label" class="cyber-textarea__label text-xl font-bold">{{ label }}</span>
      <slot name="header" />
      <span v-if="tag" class="cyber-textarea__tag">{{ tag }}</span>
    </div>

    <div class="cyber-textarea__frame">
      <textarea
        class="cyber-textarea__input font-mono text-sm max-h-svh min-h-[250px] md:min-h-[350px]"
        :value="resolvedValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :name="name"
        :id="id"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>

    <div v-if="helper || errorMessage" class="cyber-textarea__footer flex flex-col pt-2 md:min-h-[60px]">
      <span
        class="cyber-textarea__helper text-sm"
        :class="{ 'is-error': error }"
      >
        {{ error ? errorMessage : helper }}
      </span>

      <span v-if="maxlength" class="cyber-textarea__count">
        {{ currentLength }}/{{ maxlength }}
      </span>
      <slot name="footer" />
    </div>
  </label>
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
  name: 'CyberTextarea',
  emits: ['update:modelValue', 'input'],
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    helper: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
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
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    id: {
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
  data() {
    return {
      isFocused: false
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
    resolvedValue() {
      return this.modelValue !== undefined ? this.modelValue : this.value
    },
    currentLength() {
      return (this.resolvedValue || '').length
    },
    fillColor() {
      if (this.error) return 'rgba(127, 29, 29, 0.92)'

      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.8)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.edge
    },
    hoverFillColor() {
      if (this.error) return 'rgba(153, 27, 27, 0.95)'

      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.9)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.hover
    },
    activeFillColor() {
      if (this.error) return 'rgba(127, 29, 29, 0.98)'

      if (this.resolvedTone === 'glass') {
        return 'rgba(0, 0, 0, 0.95)'
      }

      if (this.resolvedTone === 'outline') {
        return 'transparent'
      }

      return this.palette.active
    },
    edgeGlowColor() {
      if (this.error) return '#fca5a5'

      if (this.resolvedTone === 'glass' || this.resolvedTone === 'outline') {
        if (this.resolvedVariant === 'black') {
          return 'rgba(255, 255, 255, 0.12)'
        }
        return this.palette.edge
      }

      return this.palette.glow
    },
    activeGlowColor() {
      if (this.error) return '#fecaca'

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
        '--fill': this.active || this.isFocused ? this.activeFillColor : this.fillColor,
        '--fill-hover': this.hoverFillColor,
        '--glow': this.active || this.isFocused ? this.activeGlowColor : this.edgeGlowColor,
        '--frame-padding': this.padding,
        '--corner-inset': this.cornerInset,
        '--bevel-size': this.bevelSize,
        '--right-cut': this.rightCut,
        '--bottom-left-cut': this.bottomLeftCut,
        '--shadow-offset': this.shadowOffset,
        '--frame-min-height': this.minHeight
      }
    }
  },
  methods: {
    onInput(e) {
      const val = e.target.value
      this.$emit('update:modelValue', val)
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.cyber-textarea {
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

  display: block;
  width: 100%;
  box-sizing: border-box;
}

.cyber-textarea.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cyber-textarea__header,
.cyber-textarea__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cyber-textarea__header {
  margin-bottom: 8px;
}

.cyber-textarea__footer {
  margin-top: 8px;
}

.cyber-textarea__label {
  letter-spacing: 1px;
}

.cyber-textarea__tag {
  background: var(--glow);
  color: #111;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  padding: 3px 6px;
  white-space: nowrap;
}

.cyber-textarea__frame {
  position: relative;
  z-index: 0;
  width: 100%;
  min-height: var(--frame-min-height);
  padding: var(--frame-padding);
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

.cyber-textarea__frame::before,
.cyber-textarea__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  clip-path: var(--clip);
  z-index: -1;
}

.cyber-textarea__frame::before {
  background: var(--glow);
  transform: translate(var(--shadow-offset), 0);
  filter: blur(0.35px);
}

.cyber-textarea__frame::after {
  background: var(--fill);
}

.cyber-textarea:hover .cyber-textarea__frame::after {
  background: var(--fill-hover);
}

.cyber-textarea.tone-glass .cyber-textarea__frame,
.cyber-textarea.tone-outline .cyber-textarea__frame {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cyber-textarea.tone-outline .cyber-textarea__frame::after {
  background: transparent;
}

.cyber-textarea__input {
  display: block;
  width: 100%;
  min-width: 0;
  /* min-height: 350px; */
  resize: vertical;
  border: 0;
  outline: none;
  background: transparent;
  color: white;
  caret-color: white;
  line-height: 1.5;
  box-sizing: border-box;
}

.cyber-textarea__input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.cyber-textarea__input:disabled,
.cyber-textarea__input:read-only {
  cursor: not-allowed;
}

.cyber-textarea__helper,
.cyber-textarea__count {
  /* font-size: 14px; */
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
}

.cyber-textarea__helper.is-error,
.cyber-textarea.has-error .cyber-textarea__count {
  color: #fecaca;
}

.cyber-textarea.has-error .cyber-textarea__frame::before {
  background: #fecaca;
}

.cyber-textarea.has-error .cyber-textarea__frame::after {
  background: rgba(127, 29, 29, 0.92);
}

.cyber-textarea.has-error:hover .cyber-textarea__frame::after {
  background: rgba(153, 27, 27, 0.95);
}
</style>