// server/api/dashboard-count.get.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  const auth = getCookie(event, 'dashboard_auth')

  if (auth !== 'true') {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const store = getStore('pageviews')
  const blobs = await store.list()

  let total = 0
  const pages: Array<{ path: string; count: number }> = []

  for (const blob of blobs.blobs) {
    const data = await store.get(blob.key, { type: 'json' }) as { path?: string; count?: number } | null

    if (data) {
      const count = Number(data.count || 0)
      total += count
      pages.push({
        path: data.path || blob.key,
        count
      })
    }
  }

  pages.sort((a, b) => b.count - a.count)

  return { total, pages }
})