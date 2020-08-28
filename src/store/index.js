import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        encounters: {
            e_1: {
                name: 'Encounter 1',
                id: 'e_1',
                monsters: ['m_11', 'm_12'],
            },
            e_2: {
                name: 'Encounter 2',
                id: 'e_2',
                monsters: ['m_21', 'm_22'],
            },
        },
        encounterList: ['e_1', 'e_2'],
        monsters: {
            m_11: {
                name: "Monster 11",
                id: 11,
                hp : 12,
                ac: 16,
                tags: ["Prone"],
            },
            m_12: {
                name: "Monster 12",
                id: 12,
                hp : 18,
                ac: 12,
                tags: ["Unconscious"],
            },
            m_21: {
                name: "Monster 21",
                id: 21,
                hp : 12,
                ac: 16,
                tags: ["Prone"],
            },
            m_22: {
                name: "Monster 22",
                id: 22,
                hp : 18,
                ac: 12,
                tags: ["Unconscious"],
            }
        },
    },
    mutations: {
        setEncounters(state, val) {
            state.encounters = val
        }
    },
    getters: {
        encounterSet: (state) => state.encounterList.map(encounterId => state.encounters[encounterId])
    }
})

export default store