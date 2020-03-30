<template>
  <div class="container mx-auto max-w-4xl">
    <PageHeader>
      A curated list of all tech conferences happening in 2020.
    </PageHeader>

    <ais-instant-search-ssr>
      <ais-search-box />
      <ais-stats />
<!--      <ais-refinement-list attribute="country" />-->
      <ais-hits>
        <template
          slot="item"
          slot-scope="{ item }"
        >
          <p>
            <ais-highlight
              attribute="name"
              :hit="item"
            />
          </p>
<!--          <p>-->
<!--            <ais-highlight-->
<!--              attribute="country"-->
<!--              :hit="item"-->
<!--            />-->
<!--          </p>-->
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-instant-search-ssr>

    <ConferenceList :conferences="conferences" />
    <PageFooter />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createInstantSearch
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

import PageFooter from '../components/PageFooter'
import PageHeader from '../components/PageHeader.vue'
import ConferenceList from '~/components/ConferenceList.vue'

const searchClient = algoliasearch(
  'FE3LXVPW06',
  '7b6951d7f02f1108c1507266088487c8'
)

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'everyconference_conferences'
})

export default defineComponent({
  asyncData () {
    return instantsearch
      .findResultsState({
        // find out which parameters to use here using ais-state-results
        // query: 'iphone',
        // hitsPerPage: 5,
        // disjunctiveFacets: ['country'],
        // disjunctiveFacetsRefinements: { country: ['France'] }
      })
      .then(() => ({
        instantSearchState: instantsearch.getState()
      }))
  },
  beforeMount () {
    instantsearch.hydrate(this.instantSearchState)
  },
  mixins: [rootMixin],
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'
        }
      ]
    }
  },

  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,

    ConferenceList,
    PageHeader,
    PageFooter
  },
  computed: {
    conferences () {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return this.$store.state.conferences.filter(conf => (new Date(conf.endDate)) > yesterday)
    }
  },
  async fetch ({ store }) {
    await store.dispatch('loadConferences')
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
