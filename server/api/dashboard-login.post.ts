// server/api/dashboard-login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = body?.password

  if (!process.env.DASHBOARD_PASSWORD) {
    throw createError({ statusCode: 500, statusMessage: 'Dashboard password is not configured' })
  }

  if (password !== process.env.DASHBOARD_PASSWORD) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  setCookie(event, 'dashboard_auth', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24
  })

  return { ok: true }
})