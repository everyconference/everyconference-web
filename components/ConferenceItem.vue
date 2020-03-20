<template>
  <div class="rounded-md overflow-hidden shadow-md mb-6 px-6 py-4 text-left bg-white">
    <div class="float-right text-xl text-gray-600 mt-2">
      {{ confdate }}
    </div>
    <h2 class="text-3xl font-bold text-blue-900">
      <a :href="conference.url" target="_blank">
        {{ conference.name }}
      </a>
    </h2>
    <div class="text-gray-700">
      {{ conference.city }}, {{ conference.country }}
    </div>
    <div v-if="conference.twitter">
      <a :href="'https://twitter.com/' + conference.twitter.replace('@','')">{{ conference.twitter }}</a>
    </div>
  </div>
</template>
<script>
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    conference: Object
  },
  computed: {
    confdate () {
      const monthnames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      if (this.conference) {
        const start = new Date(this.conference.startDate)
        const end = new Date(this.conference.endDate)
        if (start.getMonth() !== end.getMonth()) {
          return start.getDate() + ' ' + monthnames[start.getMonth()] +
            ' - ' + end.getDate() + ' ' + monthnames[end.getMonth()] +
            ' ' + start.getFullYear()
        } else if (start.getDate() !== end.getDate()) {
          return start.getDate() + ' - ' + end.getDate() +
            ' ' + monthnames[start.getMonth()] +
            ' ' + start.getFullYear()
        } else {
          return start.getDate() + ' ' + monthnames[start.getMonth()] + ' ' + start.getFullYear()
        }
      }
      return ''
    }
  }
})
</script>
