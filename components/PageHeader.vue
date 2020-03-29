<template>
  <div class="px-6 lg:px-0">
    <h1 class="text-4xl font-bold text-blue-900 mt-6">
      <span class="text-teal-600">Every</span>Conference
    </h1>
    <div class="mb-8 mt-2 text-gray-600 text-xl">
      <slot />
    </div>
    <div class="mb-4">
      <a href="/" class="text-teal-600 hover:underline">
        All
      </a>
      &middot;
      <a href="/vue-conferences/" class="text-teal-600 hover:underline">
        Vue
      </a>
      &middot;
      <a href="/react-conferences/" class="text-teal-600 hover:underline">
        React
      </a>
      &middot;
      <a href="/angular-conferences/" class="text-teal-600 hover:underline">
        Angular
      </a>
      &middot;
      <a href="/node-conferences/" class="text-teal-600 hover:underline">
        Node
      </a>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
