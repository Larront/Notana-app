import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        encounters: [],
    },
    mutations: {
        setEncounters(state, val) {
            state.encounters = val
        }
    }
})

export default store