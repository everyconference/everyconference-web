<template>
  <div class="container mx-auto max-w-4xl">
    <PageHeader>
      All React conferences happening in 2020.
    </PageHeader>
    <ConferenceList :conferences="conferences" />
    <PageFooter />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PageFooter from '../components/PageFooter'
import PageHeader from '../components/PageHeader.vue'
import ConferenceList from '~/components/ConferenceList.vue'

export default defineComponent({
  components: {
    ConferenceList,
    PageHeader,
    PageFooter
  },
  computed: {
    conferences () {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return this.$store.state.conferences
        .filter(conf => (new Date(conf.endDate)) > yesterday)
        .filter((conf) => {
          return conf.name.toLowerCase().includes('react')
        })
    }
  },
  async fetch ({ store }) {
    await store.dispatch('loadConferences')
  }
})
</script>
