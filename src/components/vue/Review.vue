<template>
    <div class="max-w-3xl w-full">
      <div v-if="error" class="text-red-500">Something went wrong</div>
      <form @submit.prevent="onSubmitHandler" class="block border bg-blue-100 border-blue-300 rounded-md p-6 dark:bg-blue-950 dark:border-blue-800">
        <div>
          <label class="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm" for="name">Name</label>
          <input id="name" v-model="name" type="text" placeholder="Sam" required class="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60" />
        </div>
        <div class="mt-3">
          <label class="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm" for="message">Message</label>
          <input id="message" v-model="message" type="text" class="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60" placeholder="A friendly message" required />
        </div>
        <button class="w-full dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-4 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" :disabled="loading">
          Submit
        </button>
      </form>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <li v-for="review in reviews" :key="review.id" class="p-4 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700">
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">{{ review.name }}</p>
          <p class="mt-1">{{ review.message }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        message: '',
        reviews: [],
        loading: false,
        error: false
      }
    },
    mounted() {
      this.fetchReviews()
    },
    methods: {
      async fetchReviews() {
        try {
          const res = await fetch('/api/guestbook')
          this.reviews = await res.json()
        } catch (err) {
          this.error = true
        }
      },
      async onSubmitHandler() {
        this.loading = true
        try {
          const res = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.name, message: this.message })
          })
          const newReview = await res.json()
          this.reviews.push(newReview)
          this.name = ''
          this.message = ''
        } catch (err) {
          this.error = true
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>