<template>
  <v-app>
    <v-app-bar :model-value="$router.currentRoute.value.path != '/'">
      <v-container>
        <router-link to="/" style="text-decoration:none">
          <v-app-bar-title>
            grifpkg
          </v-app-bar-title>
        </router-link>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app absolute border="t">
      <v-container class="text-center">
        <small>
          <p>
            grifpkg is <u>not</u> affiliated to spigotmc.org, curseforge.com or modrinth.com, and complies with
            their TOS or have negotiated with them in order to deliver resource files. All data from resources
            hosted
            by
            external services are &copy; of their respective authors and platforms.
          </p>
          <p class="mt-5">
            &copy; grifpkg {{ new Date().getFullYear() }}, limited to our back-end, front-end, CLI and user
            generated
            data from grifpkg.com
          </p>
        </small>
      </v-container>
    </v-footer>
  </v-app>
</template>