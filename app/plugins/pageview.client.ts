// plugins/pageview.client.ts
export default defineNuxtPlugin(() => {
  const route = useRoute()

  watch(
    () => route.fullPath,
    async (path) => {
      try {
        await $fetch('/api/pageview', {
          method: 'POST',
          body: { path }
        })
      } catch (error) {
        console.error('pageview client error:', error)
      }
    },
    { immediate: true }
  )
})