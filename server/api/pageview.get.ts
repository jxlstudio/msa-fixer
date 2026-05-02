// server/api/pageview.get.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = String(query.path || '/')

  const store = getStore('pageviews')
  const key = encodeURIComponent(path)

  const data = await store.get(key, { type: 'json' })

  return data || { path, count: 0 }
})