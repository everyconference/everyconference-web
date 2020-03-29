import axios from 'axios'

export const state = () => ({
  conferences: []
})

export const mutations = {
  setConferences (state, conferences) {
    state.conferences = conferences
  }
}

export const actions = {
  async loadConferences ({ commit }) {
    /* eslint-disable */
    console.log(' * Loading conferences...')
    const { data: conferences } = await axios.get('https://raw.githubusercontent.com/tech-conferences/conference-data/master/conferences/2020/javascript.json')
    commit('setConferences', conferences)
  }
}
