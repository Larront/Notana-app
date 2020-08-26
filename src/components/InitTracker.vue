<template>
  <div id="init-tracker">
    <b-tabs v-model="activeEncounter">
      <template v-for="encounter in encounters">
        <b-tab-item :key="encounter.id" :value="encounter.id" :label="encounter.label">
          <init-item v-for="monster in encounter.monsters" :key="monster.id"></init-item>
        </b-tab-item>
      </template>
    </b-tabs>
    <div>Monster Options</div>
    <div>Monster List</div>
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
    ...mapState(["encounters"]),
  },
};
</script>