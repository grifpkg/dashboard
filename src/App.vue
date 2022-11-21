<template>
  <v-app>
    <navigation v-if="$router.currentRoute.value.path != '/'" />
    <v-main>
      <router-view />
    </v-main>
    <v-footer app absolute border="t">
      <v-container class="text-center">
        <small>
          <p>
            grifpkg is <u>not</u> affiliated to spigotmc.org, curseforge.com or
            modrinth.com, and complies with their TOS or have negotiated with
            them in order to deliver resource files. All data from resources
            hosted by external services are &copy; of their respective authors
            and platforms.
          </p>
          <p class="mt-5">
            &copy; grifpkg {{ new Date().getFullYear() }}, limited to our
            back-end, front-end, CLI and user generated data from grifpkg.com
          </p>
        </small>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: {
    Navigation,
  },
};
</script>