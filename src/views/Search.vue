<template>
  <v-progress-linear v-if="time == null" indeterminate></v-progress-linear>
  <v-container>
    <v-row v-if="resources" no-gutters>
      <v-col class="mb-3" cols="12" v-for="resource in resources" :key="resource.name">
        <resource :verified="Math.random() < 0.3" :name="resource.name" :description="resource.description"
          :downloads="resource.downloads" :installs="resource.installs" :rating="resource.rating"
          :bucket="resource.bucket" :authors="resource.authors" :icon="resource.icon"
          :categories="resource.categories" />
      </v-col>
      <v-col class="text-center">
        <v-chip>
          {{ resources.length }} resources found in {{ time }}ms
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Resource from "../components/Resource.vue";
export default {
  components: {
    Resource,
  },
  data: () => ({
    resources: null,
    time: null,
  }),
  methods: {
    async search() {
      this.time = null
      const start = new Date()
      const query = this.$route.query?.q
      this.resources = await (await fetch('http://localhost:3000/search?' + new URLSearchParams({
        slug: query,
      }))).json()
      this.time = new Date().getTime() - start.getTime()
    }
  },
  watch: {
    $route() {
      this.search()
    }
  },
  mounted() {
    this.search()
  }
};
</script>