<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto max-w-4xl space-y-6">
      <h1 class="text-2xl font-bold">MSA Deck List Tool</h1>
      <p>This tool converts standard deck lists into an expanded format where each card is listed individually (e.g., 4x becomes four 1x entries). This format has been reported by players to improve shuffle randomness in MSA when importing decks from sources like Exburst and Egman.</p>

      <p>MSA’s built-in shuffling is believed to have inconsistencies, and manually expanding deck lists has become a common workaround to achieve more reliable opening hands and draws. This tool automates that process and also provides an optional pre-shuffle using a Fisher–Yates algorithm for additional randomization.</p>

      <div class="space-y-2">
        <label for="deck-input" class="block text-sm font-medium text-gray-700">
          Input
        </label>
        <textarea
          id="deck-input"
          v-model="input"
          class="h-64 w-full rounded border p-3 font-mono text-sm"
          placeholder="Paste deck list here..."
          spellcheck="false"
        />
      </div>

      <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input v-model="shuffleEnabled" type="checkbox" />
        Pre-shuffle output
      </label>

      <div class="space-y-2">
        <label for="deck-output" class="block text-sm font-medium text-gray-700">
          Output
        </label>
        <textarea
          id="deck-output"
          :value="output"
          readonly
          class="h-64 w-full rounded border p-3 font-mono text-sm"
          spellcheck="false"
        />
      </div>

      <div class="flex gap-3">
        <button
          type="button"
          class="rounded bg-black px-4 py-2 text-white"
          @click="copyOutput"
        >
          Copy Output
        </button>

        <button
          type="button"
          class="rounded border px-4 py-2"
          @click="loadSample"
        >
          Load Sample
        </button>

        <button
          type="button"
          class="rounded border px-4 py-2"
          @click="clearAll"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const SAMPLE_INPUT = `// Main Deck
4x GD01-118
4x GD01-086
4x GD02-079
1x ST01-014
2x ST04-015
2x ST04-012
2x GD01-100
4x ST04-010
2x GD01-129
4x ST01-001
4x ST01-010
2x GD01-072
3x GD03-084
4x ST04-001
1x GD01-117
3x GD03-003
4x GD03-002`

const input = ref(SAMPLE_INPUT)
const shuffleEnabled = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

function parseAndExpand(text: string): string[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith('//'))

  const result: string[] = []

  for (const line of lines) {
    const match = line.match(/^(\d+)x\s+(.+)$/i)
    if (!match) continue

    const qty = Number(match[1])
    const code = match[2].trim()

    if (!Number.isFinite(qty) || qty <= 0 || !code) continue

    for (let i = 0; i < qty; i += 1) {
      result.push(`1x ${code}`)
    }
  }

  return result
}

function cryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0

  const cryptoObj = globalThis.crypto
  if (!cryptoObj?.getRandomValues) {
    return Math.floor(Math.random() * maxExclusive)
  }

  const range = 0x100000000
  const maxUnbiased = Math.floor(range / maxExclusive) * maxExclusive
  const buffer = new Uint32Array(1)

  while (true) {
    cryptoObj.getRandomValues(buffer)
    const value = buffer[0]
    if (value < maxUnbiased) {
      return value % maxExclusive
    }
  }
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = cryptoRandomInt(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

const output = computed(() => {
  const expanded = parseAndExpand(input.value)

  if (!shuffleEnabled.value) {
    return expanded.join('\n')
  }

  if (!isMounted.value) {
    return expanded.join('\n')
  }

  return shuffle(expanded).join('\n')
})

async function copyOutput() {
  await navigator.clipboard.writeText(output.value)
}

function loadSample() {
  input.value = SAMPLE_INPUT
}

function clearAll() {
  input.value = ''
}
</script>
