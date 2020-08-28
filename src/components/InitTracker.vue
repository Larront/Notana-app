<template>
  <div id="init-tracker" class="columns">
      <div id="sidebar" class="is-1">
          <b-button expanded>Add Monster</b-button>
          <b-button expanded>Delete Encounter</b-button>
      </div>
    <b-tabs v-model="activeEncounter" class="column">
      <template v-for="encounter in encounters">
        <b-tab-item :key="encounter.id" :value="encounter.id" :label="encounter.name">
          <init-item v-for="monster in encounterMonsters(encounter)" :key="monster.id" :monster="monster"></init-item>
        </b-tab-item>
      </template>
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import InitItem from "./InitItem.vue";

export default {
  components: {
    InitItem,
  },
  data() {
    return {
      activeEncounter: "",
    };
  },
  computed: {
    ...mapState(['monsters', 'encounters']),
  },
  methods: {
        encounterMonsters(encounter) {
            return encounter.monsters.map(monsterId => this.monsters[monsterId])
        }
    }
};
</script>