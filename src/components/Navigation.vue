<template>
  <v-app-bar>
    <v-spacer />
    <v-col class="text-right">
      <router-link to="/" style="text-decoration: none">
        <v-app-bar-title style="font-weight: 900">
          grifpkg
        </v-app-bar-title>
      </router-link>
    </v-col>
    <v-container class="flex-shrink-1">
      <search-bar />
    </v-container>
    <v-col>
      <v-btn icon :rounded="1" to="/settings">
        <v-avatar> 🕵️ </v-avatar>
      </v-btn>
    </v-col>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import SearchBar from './SearchBar.vue';
export default {
  components: {
    SearchBar,
  },
};
</script>