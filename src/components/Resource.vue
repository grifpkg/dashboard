<template>
  <v-card class="d-flex" style="overflow: visible">
    <div style="flex: 1 1 100%" class="pa-4">
      <v-row no-gutters align="center">
        <v-col class="pr-7" cols="auto">
          <v-badge color="transparent" location="bottom end" offset-x="10" offset-y="10">
            <template v-slot:badge>
              <v-avatar variant="flat" size="32px">
                <v-img v-if="authors[0]?.pfp" :src="authors[0].pfp" />
                <v-icon v-else>mdi-account</v-icon>
                <v-tooltip theme="light" location="bottom" activator="parent">
                  {{ authors.map(a => a.username).join(', ') }}
                </v-tooltip>
              </v-avatar>
            </template>
            <v-avatar size="54px">
              <v-img v-if="icon" alt="Avatar" :src="icon" />
              <v-icon v-else>mdi-package</v-icon>
            </v-avatar>
          </v-badge>

        </v-col>
        <v-col>
          <v-list-item class="pa-0" lines="two">
            <v-list-item-title>
              {{ name }}
              <v-avatar v-if="verified" size="x-small">
                <v-icon size="x-small">mdi-check-decagram</v-icon>
              </v-avatar>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ description }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
        <v-col cols="auto">
          <v-chip :disabled="rating.average == null" class="mx-1" color="primary" prepend-icon="mdi-star" label
            size="small">
            <template v-if="rating.average != null">
              {{ Math.round(rating.average * 5 * 10) / 10 }}/5
            </template>
            <template v-else>
              ?
            </template>
            <v-tooltip theme="light" location="bottom" activator="parent">
              <template v-if="rating.average != null">
                {{ rating.count }} rating<template v-if="rating.count > 1">s</template>
              </template>
              <template v-else>
                {{ bucket.host }} does not provide rating information
              </template>
            </v-tooltip>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip class="mx-1" color="primary" prepend-icon="mdi-download" label size="small">
            {{ String(this.numAbbr.abbreviate(downloads, 0)).toUpperCase() }}
            <v-tooltip theme="light" location="bottom" activator="parent">
              {{ installs }} installs
            </v-tooltip>
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip class="mx-1" variant="text" color="primary" label size="small">
            {{ bucket.host }}
            <v-tooltip theme="light" location="bottom" activator="parent">
              categories: {{ categories?.map(c => c.name).join(', ') }}
            </v-tooltip>
          </v-chip>
        </v-col>
        <!--<v-col cols="auto">
          <v-chip class="mx-1" color="primary" prepend-icon="mdi-clock" label size="small">
            DD/MM/YY
            <v-tooltip theme="light" location="bottom" activator="parent">
              latest update
            </v-tooltip>
          </v-chip>
        </v-col>-->
      </v-row>
    </div>
    <v-sheet color="primary" style="flex: 0 0 1" class="d-flex align-center">
      <copy :value="`grif install ${this.name}`" />
    </v-sheet>
  </v-card>
</template>

<script>
import NumAbbr from 'number-abbreviate'
import Copy from "./Copy.vue";
export default {
  components: {
    Copy,
  },
  data: () => ({
    numAbbr: new NumAbbr()
  }),
  props: ["verified", "name", "description", "rating", "downloads", "bucket", "installs", "categories", "icon", "authors"],
};
</script>