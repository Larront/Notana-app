import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        encounters: [
            {
                name: "Encounter 1",
                id: 1,
                monsters: [
                    {
                        name: "Monster 11",
                        id: 11,
                        hp : 12,
                        ac: 16,
                        tags: ["Prone"],
                    },
                    {
                        name: "Monster 12",
                        id: 12,
                        hp : 18,
                        ac: 12,
                        tags: ["Unconscious"],
                    },
                ]
            },
            {
                name: "Encounter 2",
                id: 2,
                monsters: [
                    {
                        name: "Monster 21",
                        id: 21,
                        hp : 12,
                        ac: 16,
                        tags: ["Prone"],
                    },
                    {
                        name: "Monster 22",
                        id: 22,
                        hp : 18,
                        ac: 12,
                        tags: ["Unconscious"],
                    },
                ]
            }
        ],
    },
    mutations: {
        setEncounters(state, val) {
            state.encounters = val
        }
    }
})

export default store