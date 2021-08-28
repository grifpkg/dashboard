<template>
  <div
    @click="seeResource()"
    class="box is-clickable"
    style="margin-top: 10px; margin-bottom: 0px"
  >
    <div class="columns is-vcentered">
      <div class="column ellipsis">
        {{ resource.name }}
      </div>
      <div class="is-hidden-mobile column">
        <copy-bar
          style="float: right"
          :value="`@${resource.author.username}/${resource.name}`"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CopyBar from "./CopyBar.vue";
export default {
  components: { CopyBar },
  props: ["resource"],
  methods: {
    seeResource() {
      this.$router.push({ path: `/resource/${this.resource.id}` });
    },
  },
};
</script>