<template>
  <v-card class="d-flex" style="overflow: visible">
    <div style="flex: 1 1 100%" class="pa-5">
      <v-row align="center">
        <v-col>
          <v-list-item-title>
            {{ name }}
            <v-avatar v-if="verified" size="x-small">
              <v-icon size="x-small">mdi-check-decagram</v-icon>
            </v-avatar>
          </v-list-item-title>
          <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
        </v-col>
        <v-col cols="auto">
          <v-chip
            variant="text"
            class="mr-2"
            color="primary"
            label
            :rounded="0"
          >
            spigotmc.org
            <v-tooltip theme="light" location="bottom" activator="parent">
              category: misc
            </v-tooltip>
          </v-chip>
          <v-chip
            class="mr-2"
            color="primary"
            prepend-icon="mdi-download"
            label
            :rounded="0"
          >
            {{ downloads }}
            <v-tooltip theme="light" location="bottom" activator="parent">
              0 installs
            </v-tooltip>
          </v-chip>
          <v-chip
            color="primary"
            prepend-icon="mdi-star"
            label
            :rounded="0"
            class="mr-2"
          >
            {{ Math.round(rating * 5 * 10) / 10 }}/5
            <v-tooltip theme="light" location="bottom" activator="parent">
              30 ratings
            </v-tooltip>
          </v-chip>
          <v-chip color="primary" prepend-icon="mdi-clock" label :rounded="0">
            DD/MM/YY
            <v-tooltip theme="light" location="bottom" activator="parent">
              latest update
            </v-tooltip>
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <v-sheet color="primary" style="flex: 0 0 1" class="d-flex align-center">
      <copy :value="'asd'" />
    </v-sheet>
  </v-card>
</template>

<script>
import Copy from "./Copy.vue";
export default {
  components: {
    Copy,
  },
  props: ["verified", "name", "description", "rating", "downloads"],
};
</script>