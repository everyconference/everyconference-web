<template>
  <div class="container mx-auto max-w-4xl">
    <div class="px-6 lg:px-0">
      <h1 class="text-4xl font-bold text-blue-900 mt-6">
        <span class="text-teal-600">Every</span>Conference
      </h1>
      <div class="mb-10 mt-2 text-gray-600 text-xl">
        A curated list of all tech conferences happening in 2020.
      </div>
    </div>
    <ConferenceItem v-for="conference in conferences" :key="conference.url" :conference="conference" />
    <div class="text-center mb-4 text-gray-500 text-sm">
      data by <a href="https://github.com/tech-conferences/conference-data" target="_blank">confs.tech</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { createComponent } from '@vue/composition-api'
import ConferenceItem from '~/components/ConferenceItem.vue'

export default createComponent({
  components: {
    ConferenceItem
  },
  async asyncData () {
    const { data: conferences } = await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2020/javascript.json')
    return { conferences }
  }
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
