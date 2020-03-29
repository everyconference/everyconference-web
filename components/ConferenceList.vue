<template>
  <div>
    <ConferenceItem v-for="(conference, index) in conferences" :key="index" :conference="conference" />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import ConferenceItem from './ConferenceItem'

export default defineComponent({
  components: {
    ConferenceItem
  },
  props: {
    conferences: Array
  }
})
</script>
