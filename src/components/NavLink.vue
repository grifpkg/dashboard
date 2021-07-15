<template>
  <div @click="onClick">
    <b-button
      tag="router-link"
      :to="to != null ? to : ''"
      type="is-ghost"
      :style="`color: ${selected ? 'black' : 'gray'}`"
    >
      <slot />
    </b-button>
  </div>
</template>
<script>
export default {
  props: ["to"],
  mounted() {
    this.check(this.$route);
  },
  data: () => {
    return {
      selected: false,
    };
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    check(to) {
      if (this.to != null) {
        this.selected = to.path == this.to;
      }
    },
  },
  watch: {
    $route(to) {
      this.check(to);
    },
  },
};
</script>