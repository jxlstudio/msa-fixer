// server/api/pageview.post.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const path = body?.path || '/'

  const store = getStore('pageviews')
  const key = encodeURIComponent(path)

  const current = await store.get(key, { type: 'json' }) as { count?: number } | null
  const count = (current?.count || 0) + 1

  await store.setJSON(key, {
    path,
    count,
    updatedAt: new Date().toISOString()
  })

  return { path, count }
})