<template>
  <v-btn :loading="loading" @click="copy()" class="fill-height" icon>
    <v-scroll-x-reverse-transition>
      <v-icon v-if="copied">mdi-check</v-icon>
      <v-icon v-else-if="!justCopied">mdi-content-copy</v-icon>
    </v-scroll-x-reverse-transition>
  </v-btn>
</template>

<script>
import copy from "copy-to-clipboard";
export default {
  props: ["value"],
  data: () => ({
    copied: false,
    justCopied: false,
  }),
  methods: {
    async copy() {
      copy(this.value);
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