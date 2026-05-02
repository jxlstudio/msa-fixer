<template>
  <div class="min-h-screen p-6 bg-cosmic-void cosmic-grid-bg">
    <div class="mx-auto max-w-5xl space-y-6">
      <div class="flex items-center">
        <NuxtImg
          src="img/logo-helmet.svg"
          alt="MSA Logo"
          width="70"
        />
        <h1 class="text-2xl font-bold">MSA Deck-List Formatter</h1>
      </div>
      <p>This tool converts standard deck lists into an expanded format where each card is listed individually, rather than stacks (example: "4x ST01-001" becomes four lines of "1x ST01-001"). This format has been reported by players to improve shuffle randomization in MSA.</p>
      
      <!-- <div class="bg-blue-900/50 border px-4 py-3"> -->
      <CyberFrame
        variant="blue"
        padding="24px"
        cornerInset="20px"
        bevelSize="10px"
        rightCut="20px"
        bottomLeftCut="10px"
        shadowOffset="4px"
        tone="glass"
      >
        <div>
          <p class="pb-2"><strong>Why does this exist?</strong></p>
          <p class="text-sm"><NuxtLink :to="'https://mobilesuitarena.com/'" class="hover:text-blue-300 font-bold">Mobile Suit Arena</NuxtLink> is a great tool for testing and practicing Gundam TCG decks, but its built-in shuffling is reported to have issues with randomization, and some users have found that manually expanding deck-lists to be a workaround to achieve better randomization. This tool automates that process and also provides an optional pre-shuffle using a Fisher–Yates algorithm for additional randomization.</p>
        </div>
      </CyberFrame>
      <!-- </div> -->

      <!-- <div style="display: flex; gap: 8px;">
        <CyberButton label="Save" variant="emerald" tag="01" />
        <CyberButton label="Delete" variant="red" tag="02" />
        <CyberButton label="Edit" variant="blue" tag="03" :active="true" />
        <CyberButton label="Warn" variant="amber" tag="04" />
        <CyberButton label="Ghost" variant="zinc" tag="05" />
      </div> -->

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="space-y-2">
          <!-- <label for="deck-input" class="block text-xl font-bold">
            Input
          </label>
          <textarea
            id="deck-input"
            v-model="input"
            class="h-64 w-full border p-3 font-mono text-sm bg-black/70"
            placeholder="Paste deck list here..."
            spellcheck="false"
          /> -->
          <!-- <div class="pb-4"> -->
            <CyberTextarea
              v-model="input"
              label="Input"
              helper="Works with Exburst & Egman formats. Make sure to exclude sideboards. This formatter removes Alt-Arts (ex: -ALT1) from card numbers."
              variant="black"
              tone="glass"
              placeholder="Paste deck list here..."
              cornerInset="20px"
              bevelSize="10px"
              rightCut="20px"
              bottomLeftCut="10px"
              shadowOffset="4px"
            />
          <!-- </div> -->
          <!-- <p class="block text-sm font-medium pb-4"><em>Works with Exburst and Egman formats. Ignores empty lines and lines starting with "//". <b>Make sure to exclude sideboards.</b> <br/> Note: This formatter does remove Alt-Arts (ex: -ALT1) from card numbers to help keep it simple to update.</em></p> -->

          <div class="flex flex-wrap gap-3">
            <CyberButton
              v-if="input === ''"
              label="Load Sample"
              variant="zinc"
              tag="01"
              :idle-glitch="false"
              @click="loadSample"
            />
            <CyberButton
              label="Clear List"
              variant="red"
              :tag="input === '' ? '02' : '01'"
              :idle-glitch="false"
              @click="clearAll"
            />
          </div>
        </div>

        <div class="space-y-2">
          
          <CyberTextarea
            :value="output"
            readonly
            label="Output"
            helper="This will always output decklists in the Exburst Format as MSA has a limit on its decklist input."
            variant="black"
            tone="glass"
            placeholder="Deck list output will appear here..."
            spellcheck="false"
            cornerInset="20px"
            bevelSize="10px"
            rightCut="20px"
            bottomLeftCut="10px"
            shadowOffset="4px"
          >
          <template #header>
            <CyberToggle
              v-model="shuffleEnabled"
              label="Pre-Shuffle Output"
              variant="emerald"
              size="24px"
              :idle-glitch="false"
            />
          </template>
          </CyberTextarea>

          <div class="flex flex-wrap items-center gap-3 pb-6">
            
            <CyberButton
              label="Copy List"
              variant="blue"
              tag="01"
              :idle-glitch="false"
              @click="copyOutput"
            />

            <div v-if="shuffleEnabled && output !== ''">
              <CyberButton
                label="Preview"
                variant="emerald"
                tag="02"
                :idle-glitch="false"
                @click="openPreview"
              />
            </div>

          </div>
        </div>
      </div>
      <p class="text-xs">Disclaimer: This tool is not affliated with, endorsed or sponsored by MobileSuitArena, Doug Godinho, SOTSU SUNRISE, SOTSU SUNRISE MBS, or BANDAI. Gundam and its associated trademarks and copyrights are owned by SOTSU SUNRISE, SOTSU SUNRISE MBS, BANDAI.</p>
    </div>

    <div
      v-if="isPreviewOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4"
      @click.self="closePreview"
    >
      <CyberFrame
        variant="blue"
        padding="24px"
        cornerInset="20px"
        bevelSize="10px"
        rightCut="20px"
        bottomLeftCut="10px"
        shadowOffset="4px"
        tone="glass"
      >
        <div class="flex max-h-[90vh] w-full flex-col">
          <div class="flex items-center justify-between border-b px-4 py-3">
            <h2 class="text-lg font-semibold uppercase">Preview Shuffle</h2>

            <div class="flex gap-2">
              
              <CyberButton
                label="Reshuffle"
                variant="emerald"
                tag="01"
                :idle-glitch="false"
                @click="reshufflePreview"
              />

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
                      placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-800 text-center font-bold"
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
                      placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-800 text-center font-bold"
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
                      placeholder-class="flex rounded-xl border border-gray-900 items-center justify-center bg-gray-800 text-center font-bold"
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>
            </template>
          </div>


        </div>
      </CyberFrame>
    </div>

    <div
      v-if="copyMessage"
      class="fixed top-4 right-4 z-9999"
    >
      <CyberFrame
      variant="fuchsia">
        {{ copyMessage }}
      </CyberFrame>
    </div>
  </div>
</template>

<script setup lang="ts">

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
