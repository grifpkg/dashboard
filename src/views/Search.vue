<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        class="mb-3"
        cols="12"
        v-for="resource in resources"
        :key="resource.name"
      >
        <resource
          :verified="Math.random() < 0.3"
          :rating="Math.random()"
          :name="resource.name"
          :description="resource.description"
        />
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
    resources: [
      {
        name: "SkinsRestorer",
        description:
          "Ability to restore/change skins on servers! (Offline and Online Mode)(Bungee/Spigot/Sponge/Velocity)",
      },
      {
        name: "EssentialsX",
        description:
          "The modern Essentials suite for Spigot and Paper.",
      },
      {
        name: "LuckPerms",
        description:
          "A permissions plugin for Minecraft servers (Bukkit/Spigot, BungeeCord & more)",
      },
      {
        name: "ViaVersion",
        description:
          "Allow newer versions to connect, why lose players after a Minecraft update?",
      },
      {
        name: "Vault",
        description:
          "Vault is a Permissions, Chat, & Economy API to give plugins easy hooks into these systems.",
      },
    ],
  }),
};
</script>