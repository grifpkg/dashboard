<template>
  <v-card style="overflow: visible" class="d-flex">
    <v-sheet color="primary" style="flex: 0 0 1" class="d-flex align-center">
      <copy :loading="loading" :value="cmd" />
    </v-sheet>
    <div style="flex: 0 0 1" class="d-flex align-center">
      <slot name="prepend" />
    </div>
    <div style="flex: 1 1 100%">
      <v-sheet
        color="black"
        class="py-2 text-left"
        :style="`position:relative;overflow-x:${
          overflow != null ? 'scroll' : 'hidden'
        }`"
      >
        <v-progress-linear
          v-if="loading"
          indeterminate
          style="position: absolute; top: 0px"
        />
        <div style="width: 100%">
          <pre style="width: 0">{{ loading ? "..." : cmd }}</pre>
        </div>
      </v-sheet>
    </div>
  </v-card>
</template>

<script>
import Copy from "./Copy.vue";
export default {
  components: {
    Copy,
  },
  props: ["cmd", "loading", "overflow"],
};
</script>