<template>
  <div class="container mx-auto max-w-4xl">
    <PageHeader>
      All Node conferences happening in 2020.
    </PageHeader>
    <ais-instant-search-ssr>
      <ais-search-box autofocus show-loading-indicator />
      <ais-stats>
        <template slot-scope="{ nbHits, query }">
          <p v-if="query.length > 0">
            {{ nbHits }} conferences found
          </p>
          <span v-else />
        </template>
      </ais-stats>
      <!--      <ais-refinement-list attribute="country" />-->
      <ais-infinite-hits>
        <template slot-scope="{ items, refineNext }">
          <div v-for="item in items" :key="item.objectID" class="rounded-md overflow-hidden shadow-md mb-6 px-6 py-4 text-left bg-white">
            <div class="float-right text-xl text-gray-600 mt-2">
              {{ item.confdate }}
            </div>
            <div class="text-3xl font-bold text-blue-900">
              <a :href="item.url" target="_blank">
                <ais-highlight attribute="name" :hit="item" />
              </a>
            </div>
            <div class="text-gray-700">
              <ais-highlight attribute="city" :hit="item" />, <ais-highlight attribute="country" :hit="item" />
            </div>
            <div v-if="item.twitter">
              <a :href="'https://twitter.com/' + item.twitter.replace('@','')" target="_blank">
                <ais-highlight attribute="twitter" :hit="item" />
              </a>
            </div>
          </div>
          <div>
            <button @click="refineNext">
              Show more results
            </button>
          </div>
        </template>
      </ais-infinite-hits>
    </ais-instant-search-ssr>
    <PageFooter />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisInfiniteHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  createInstantSearch
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

import PageFooter from '../components/PageFooter'
import PageHeader from '../components/PageHeader.vue'

const searchClient = algoliasearch(
  'FE3LXVPW06',
  '7b6951d7f02f1108c1507266088487c8'
)

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'everyconference_conferences'
})

export default defineComponent({
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisInfiniteHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    PageHeader,
    PageFooter
  },
  asyncData () {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return instantsearch
      .findResultsState({
        // find out which parameters to use here using ais-state-results
        filters: `endTimestamp > ${Math.floor(yesterday.getTime() / 1000)} AND _tags:node`
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
  }
})
</script>

<style>
  [class^=ais-] {
      font-size: inherit;
      box-sizing: inherit;
  }
</style>
