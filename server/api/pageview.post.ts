// server/api/pageview.post.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const path = body?.path || '/'

    const key = encodeURIComponent(path.replace(/^\/+/, '') || 'home')

    const store = getStore('pageviews')

    const current = await store.get(key, { type: 'json' }) as { count?: number } | null
    const count = Number(current?.count || 0) + 1

    await store.setJSON(key, {
      path,
      count,
      updatedAt: new Date().toISOString()
    })

    return { path, count }
  } catch (error: any) {
    console.error('pageview error:', {
      message: error?.message,
      stack: error?.stack
    })

    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'Pageview failed'
    })
  }
})