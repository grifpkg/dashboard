<template>
  <v-text-field
    @keyup.enter="
      $router.push({
        path: query ? '/search' : '/',
        query: { q: query ? query : undefined },
      })
    "
    :autofocus="!$vuetify.display.mobile"
    append-inner-icon="mdi-magnify"
    v-model="query"
    placeholder="Search across spigotmc.org, curseforge.com and modrinth.com"
    variant="outlined"
  />
</template>

<script>
export default {
  data: () => ({
    query: null,
  }),
  mounted() {
    this.queryFromRoute();
  },
  watch: {
    $route() {
      this.queryFromRoute();
    },
  },
  methods: {
    queryFromRoute() {
      if (this.$router.currentRoute.value.path == "/search") {
        this.query = this.$router.currentRoute.value.query?.q;
      } else {
        this.query = null;
      }
    },
  },
};
</script>