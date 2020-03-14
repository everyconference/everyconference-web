<template>
  <div style="border: solid 1px black">
    name: {{ conference.name }}<br>
    url: {{ conference.url }}<br>
    date: {{ conference.startDate }} - {{ conference.endDate }}<br>
    city: {{ conference.city }}<br>
    country: {{ conference.country }}<br>
    twitter: {{ conference.twitter }}<br>
  </div>
</template>
<script>
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    conference: Object
  }
})
</script>
