<template>
  <div class="px-6 lg:px-0">
    <h1 class="text-4xl font-bold text-blue-900 mt-6">
      <span class="text-teal-600">Every</span>Conference
    </h1>
    <div class="mb-8 mt-2 text-gray-600 text-xl">
      <slot />
    </div>
    <div class="mb-4">
      <nuxt-link to="/" class="text-teal-600 hover:underline">
        All
      </nuxt-link>
      &middot;
      <nuxt-link to="/vue-conferences" class="text-teal-600 hover:underline">
        Vue
      </nuxt-link>
      &middot;
      <nuxt-link to="/react-conferences" class="text-teal-600 hover:underline">
        React
      </nuxt-link>
      &middot;
      <nuxt-link to="/angular-conferences" class="text-teal-600 hover:underline">
        Angular
      </nuxt-link>
      &middot;
      <nuxt-link to="/node-conferences" class="text-teal-600 hover:underline">
        Node
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
