// plugins/pageview.client.ts
export default defineNuxtPlugin(() => {
  const route = useRoute()

  watch(
    () => route.fullPath,
    async (path) => {
      await $fetch('/api/pageview', {
        method: 'POST',
        body: { path }
      })
    },
    { immediate: true }
  )
})