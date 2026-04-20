<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto max-w-5xl space-y-6">
      <h1 class="text-2xl font-bold">MSA Deck-List Formatting Tool</h1>
      <p>This tool converts standard deck lists into an expanded format where each card is listed individually (example: "4x ST01-001" becomes four lines of "1x ST01-001"). This format has been reported by players to improve shuffle randomization in MSA when importing decks from sources like Exburst and Egman.</p>
      <!-- <div class="rounded bg-blue-100 border px-4 py-3">
        <p class="pb-2"><strong>Why does this exist?</strong></p>
        <p><NuxtLink :to="'https://mobilesuitarena.com/'" class="text-blue-800 hover:text-blue-500">Mobile Suit Arena</NuxtLink> is a great tool for testing and practicing Gundam TCG decks, but its built-in shuffling is reported to have issues with randomization, and some users have found that manually expanding deck-lists to be a workaround to achieve better randomization. This tool automates that process and also provides an optional pre-shuffle using a Fisher–Yates algorithm for additional randomization.</p>
      </div> -->

      <div class="space-y-2">
        <label for="deck-input" class="block text-xl font-bold text-gray-800">
          Input
        </label>
        <textarea
          id="deck-input"
          v-model="input"
          class="h-64 w-full rounded border p-3 font-mono text-sm"
          placeholder="Paste deck list here..."
          spellcheck="false"
        />
        <p class="block text-sm font-medium text-gray-800 pb-4"><em>Works with Exburst and Egman formats. Ignores empty lines and lines starting with "//". <b>Make sure to exclude sideboards.</b> <br/> Note: This formatter does remove Alt-Arts (ex: -ALT1) from card numbers to help keep it simple to update.</em></p>

        <div class="flex flex-wrap gap-3">
          <button
            type="button"
            class="rounded border px-4 py-2"
            @click="loadSample"
          >
            Load Sample List
          </button>

          <button
            type="button"
            class="rounded border text-red-500 border-red-500 hover:text-red-800 hover:border-red-800 px-4 py-2"
            @click="clearAll"
          >
            Clear List
          </button>
        </div>
      </div>


      <div class="space-y-2">
        <label for="deck-output" class="block text-xl font-bold text-gray-800">
          Output
        </label>
        <p class="block text-sm font-medium text-gray-800"><em>This will always output decklists in the Exburst Format as MSA has a limit on its decklist input.</em></p>
        <textarea
          id="deck-output"
          :value="output"
          readonly
          class="h-64 w-full rounded border p-3 font-mono text-sm"
          spellcheck="false"
        />
        <label class="flex items-center gap-2 text-sm font-medium text-gray-800">
          <input v-model="shuffleEnabled" type="checkbox" />
          <strong>Shuffle output</strong> <em>(uses crypto.randomValues() and Fisher–Yates shuffle)</em>
        </label>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="rounded bg-blue-600 hover:bg-blue-800 px-4 py-2 text-white"
          @click="copyOutput"
        >
          Copy Output
        </button>

        <div v-if="shuffleEnabled">
          <button
            type="button"
            class="rounded border text-blue-600 border-blue-600 hover:text-blue-800 hover:border-blue-800 px-4 py-2"
            @click="openPreview"
          >
            Preview Shuffle
          </button>
        </div>

        <div v-else class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="rounded border text-gray-600 px-4 hover:cursor-help py-2"
            :disabled="true"
          >
            Preview Shuffle
          </button>
          <div class="text-sm text-gray-600">
            <em>(Enable shuffle to preview)</em>
          </div>
        </div>
      </div>
      <div class="rounded bg-blue-100 border px-4 py-3">
        <p class="pb-2"><strong>Why does this exist?</strong></p>
        <p><NuxtLink :to="'https://mobilesuitarena.com/'" class="text-blue-800 hover:text-blue-500">Mobile Suit Arena</NuxtLink> is a great tool for testing and practicing Gundam TCG decks, but its built-in shuffling is reported to have issues with randomization, and some users have found that manually expanding deck-lists to be a workaround to achieve better randomization. This tool automates that process and also provides an optional pre-shuffle using a Fisher–Yates algorithm for additional randomization.</p>
      </div>
    </div>

    <div
      v-if="isPreviewOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="closePreview"
    >
      <div class="flex max-h-[90vh] w-full max-w-7xl flex-col rounded-lg bg-white shadow-xl">
        <div class="flex items-center justify-between border-b px-4 py-3">
          <h2 class="text-lg font-semibold">Preview Shuffle</h2>

          <div class="flex gap-2">
            <button
              type="button"
              class="px-3 py-1 text-sm"
              @click="closePreview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div class="overflow-y-auto space-y-8 p-4">
          <div v-if="previewCards.length === 0" class="text-sm text-gray-500">
            No valid cards found.
          </div>

          <template v-else>
            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">Starting Hand</h3>
                <span class="text-sm text-gray-500">{{ firstHandCards.length }} cards</span>
              </div>
              <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                <div
                  v-for="(card, index) in firstHandCards"
                  :key="`first-${card.cardNumber}-${index}`"
                  class="overflow-hidden"
                >
                  <NuxtImg
                    :src="card.imageUrl"
                    :alt="`${card.cardNumber} Image`"
                    class="aspect-[5/7] w-full object-cover rounded-xl border"
                    placeholder
                    placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-200 text-center font-bold"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>

            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">Mulligan Hand / First Draws</h3>
                <span class="text-sm text-gray-500">{{ mulliganHandCards.length }} cards</span>
              </div>
              <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                <div
                  v-for="(card, index) in mulliganHandCards"
                  :key="`mulligan-${card.cardNumber}-${index}`"
                  class="overflow-hidden"
                >
                  <NuxtImg
                    :src="card.imageUrl"
                    :alt="`${card.cardNumber} Image`"
                    class="aspect-[5/7] w-full object-cover rounded-xl border"
                    placeholder
                    placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-200 text-center font-bold"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>

            <section class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold">Remaining Deck</h3>
                <span class="text-sm text-gray-500">{{ remainingDeckCards.length }} cards</span>
              </div>
              <div class="grid grid-cols-3 gap-1 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10">
                <div
                  v-for="(card, index) in remainingDeckCards"
                  :key="`remaining-${card.cardNumber}-${index}`"
                  class="overflow-hidden"
                >
                  <NuxtImg
                    :src="card.imageUrl"
                    :alt="`${card.cardNumber} Image`"
                    class="aspect-[5/7] w-full object-cover rounded-xl border"
                    placeholder
                    placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-200 text-center font-bold"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </template>
        </div>

        <div class="text-center px-4 py-3">
            <button
              type="button"
              class="w-full rounded bg-blue-600 text-white uppercase font-bold border px-4 py-3 text-xl"
              @click="reshufflePreview"
            >
              Reshuffle Deck
            </button>
        </div>

      </div>
    </div>

    <div
      v-if="copyMessage"
      class="fixed bottom-4 right-4 rounded bg-black px-4 py-2 text-sm text-white shadow"
    >
      {{ copyMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed, onMounted, ref, watch } from 'vue'

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

type ParsedCard = {
  qty: number
  code: string
}

type PreviewCard = {
  cardNumber: string
  imageUrl: string
  displayLine: string
}

const input = ref('')
const shuffleEnabled = ref(false)
const isMounted = ref(false)
const isPreviewOpen = ref(false)
const copyMessage = ref('')
const previewDeck = ref<string[]>([])

onMounted(() => {
  isMounted.value = true
})

function parseDeckList(text: string): ParsedCard[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith('//'))

  const parsed: ParsedCard[] = []

  for (const line of lines) {
    const withX = line.match(/^(\d+)x\s+([A-Za-z0-9-]+)(?:\s+(.*))?$/i)
    if (withX) {
      const qty = Number(withX[1])
      let code = withX[2]?.trim()

      code = code?.replace(/-[A-Z]+\d*$/i, '')

      if (!Number.isFinite(qty) || qty <= 0 || !code) continue

      parsed.push({ qty, code })
      continue
    }

    const withoutX = line.match(/^(\d+)\s+([A-Za-z0-9-]+)(?:\s+(.*))?$/i)
    if (withoutX) {
      const qty = Number(withoutX[1])
      let code = withoutX[2]?.trim()

      code = code?.replace(/-[A-Z]+\d*$/i, '')

      if (!Number.isFinite(qty) || qty <= 0 || !code) continue

      parsed.push({ qty, code })
    }
  }

  return parsed
}

function expandDeck(cards: ParsedCard[]): string[] {
  const result: string[] = []

  for (const card of cards) {
    for (let i = 0; i < card.qty; i += 1) {
      result.push(`1x ${card.code}`)
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
    const value = buffer[0] ?? 0
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

const expandedLines = computed(() => expandDeck(parseDeckList(input.value)))

const outputLines = computed(() => {
  if (!shuffleEnabled.value) return expandedLines.value
  if (!isMounted.value) return expandedLines.value
  return shuffle(expandedLines.value)
})

const output = computed(() => outputLines.value.join('\n'))

function extractCardNumber(line: string): string | null {
  const match = line.match(/^(?:1x|1)\s+([A-Za-z0-9-]+)/i)
  return match ? (match[1] ?? null) : null
}

const previewCards = computed<PreviewCard[]>(() => {
  return previewDeck.value
    .map((line) => {
      const cardNumber = extractCardNumber(line)
      if (!cardNumber) return null

      return {
        cardNumber,
        imageUrl: `/img/cards/${cardNumber}.webp`,
        displayLine: line,
      }
    })
    .filter((card): card is PreviewCard => card !== null)
})

const firstHandCards = computed(() => previewCards.value.slice(0, 5))
const mulliganHandCards = computed(() => previewCards.value.slice(5, 10))
const remainingDeckCards = computed(() => previewCards.value.slice(10))

function buildPreviewDeck() {
  if (!isMounted.value) {
    previewDeck.value = expandedLines.value
    return
  }

  previewDeck.value = shuffle(expandedLines.value)
}

function openPreview() {
  buildPreviewDeck()
  isPreviewOpen.value = true
}

function closePreview() {
  isPreviewOpen.value = false
}

function reshufflePreview() {
  buildPreviewDeck()
}

watch(input, () => {
  if (isPreviewOpen.value) {
    buildPreviewDeck()
  }
})

async function copyOutput() {
  try {
    await navigator.clipboard.writeText(output.value)
    copyMessage.value = 'Output copied'
    window.setTimeout(() => {
      copyMessage.value = ''
    }, 2000)
  } catch {
    copyMessage.value = 'Copy failed'
    window.setTimeout(() => {
      copyMessage.value = ''
    }, 2000)
  }
}

function loadSample() {
  input.value = SAMPLE_INPUT
}

function clearAll() {
  input.value = ''
  isPreviewOpen.value = false
  previewDeck.value = []
}

// SEO and meta tags
useHead({
  title: 'MSA Deck-List Formatting Tool',
  meta: [
      {
        name: 'description', 
        content: 'This tool converts standard deck lists into an expanded format where each card is listed individually (example: "4x ST01-001" becomes four lines of "1x ST01-001"). This format has been reported by players to improve shuffle randomization in MSA when importing decks from sources like Exburst and Egman.'
      },
    ]
})
</script>
