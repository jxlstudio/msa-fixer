// server/api/pageview.post.ts
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const path = body?.path || '/'

    const store = getStore({
      name: 'pageviews',
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN
    })

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
    console.error('pageview error:', {
      message: error?.message,
      stack: error?.stack,
      hasSiteID: !!process.env.NETLIFY_SITE_ID,
      hasBlobToken: !!process.env.NETLIFY_BLOBS_TOKEN,
      hasAuthToken: !!process.env.NETLIFY_AUTH_TOKEN
    })

    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'Pageview failed'
    })
  }
})