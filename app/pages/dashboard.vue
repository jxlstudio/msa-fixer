<!-- pages/dashboard.vue -->
<script setup lang="ts">
const password = ref('')
const error = ref('')
const loggedIn = ref(false)

const { data, refresh } = await useAsyncData(
  'dashboard-count',
  () => $fetch('/api/dashboard-count'),
  {
    server: false,
    immediate: false
  }
)

async function login() {
  error.value = ''

  try {
    await $fetch('/api/dashboard-login', {
      method: 'POST',
      body: { password: password.value }
    })

    loggedIn.value = true
    await refresh()
  } catch {
    error.value = 'Invalid password'
  }
}
</script>

<template>
  <main style="max-width: 720px; margin: 4rem auto; padding: 1rem;">
    <h1>Dashboard</h1>

    <form v-if="!loggedIn" @submit.prevent="login">
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        style="padding: 0.75rem; width: 100%; margin-bottom: 1rem;"
      />

      <button type="submit">
        Log in
      </button>

      <p v-if="error" style="color: red;">
        {{ error }}
      </p>
    </form>

    <section v-else>
      <h2>Total views: {{ data?.total ?? 0 }}</h2>

      <table style="width: 100%; margin-top: 1rem;">
        <thead>
          <tr>
            <th align="left">Page</th>
            <th align="right">Views</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="page in data?.pages" :key="page.path">
            <td>{{ page.path }}</td>
            <td align="right">{{ page.count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>