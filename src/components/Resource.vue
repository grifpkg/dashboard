<template>
  <div class="box" style="margin-top: 10px; margin-bottom: 0px">
    <div class="columns is-vcentered">
      <div class="column ellipsis">
        {{ resource.name }}
      </div>
      <div class="column">
        <copy-bar
          style="float: right"
          :value="`@${resource.author.username}/${resource.name}`"
        />
      </div>
    </div>
  </div>
</template>
<style lang="css">
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script>
import CopyBar from "./CopyBar.vue";
export default {
  components: { CopyBar },
  props: ["resource"],
};
</script>