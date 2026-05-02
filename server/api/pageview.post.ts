// server/api/pageview.post.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const path = body?.path || '/'

    // Keep this INSIDE the handler
    const store = getStore('pageviews')

    const key = encodeURIComponent(path)

    const current = await store.get(key, { type: 'json' }) as { count?: number } | null
    const count = Number(current?.count || 0) + 1

    await store.setJSON(key, {
      path,
      count,
      updatedAt: new Date().toISOString()
    })

    return { path, count }
  } catch (error: any) {
    console.error('pageview error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'Pageview failed'
    })
  }
})