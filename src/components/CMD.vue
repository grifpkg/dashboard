<template>
  <v-card style="overflow: visible" class="d-flex">
    <v-sheet color="primary" style="flex: 0 0 1" class="d-flex align-center">
      <v-btn :loading="loading" @click="copy()" class="fill-height" icon>
        <v-scroll-x-reverse-transition>
          <v-icon v-if="copied">mdi-check</v-icon>
          <v-icon v-else-if="!justCopied">mdi-content-copy</v-icon>
        </v-scroll-x-reverse-transition>
      </v-btn>
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
export default {
  props: ["cmd", "loading", "overflow"],
  data: () => ({
    copied: false,
    justCopied: false,
  }),
  methods: {
    async copy() {
      //this.$copyText(this.cmd)
      if (!this.copied && !this.justCopied) {
        this.justCopied = true;
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.copied = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.copied = false;
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.justCopied = false;
      }
    },
  },
};
</script>