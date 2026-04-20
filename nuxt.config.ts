// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@nuxt/image'],
  app: {
    head: {
      title: 'MSA Deck-List Formatting Tool', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        {
          name: 'description', 
          content: 'This tool converts standard deck lists into an expanded format where each card is listed individually (example: "4x ST01-001" becomes four lines of "1x ST01-001"). This format has been reported by players to improve shuffle randomization in MSA when importing decks from sources like Exburst and Egman.'
        },
      ]
    },
  },
})
