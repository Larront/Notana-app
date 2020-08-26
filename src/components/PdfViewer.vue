<template>
  <div>
    <pdf
      ref="pdf"
      :src="src"
      :page="page"
      @num-pages="numPages = $event"
      @link-clicked="page = $event"
    ></pdf>
    <input v-model.number="page" type="number" style="width: 5em" />
    /{{numPages}}
    <div style="width: 50%">
      <div
        v-if="loadedRatio > 0 && loadedRatio < 1"
        style="background-color: green; color: white; text-align: center"
        :style="{ width: loadedRatio * 100 + '%' }"
      >{{ Math.floor(loadedRatio * 100) }}%</div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      src: "./docs/5E_Wolves_Of_Welton.pdf",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
    };
  },
};
</script>