<template>
  <v-row align="center">
    <v-col cols="auto">
      <span>
        <span v-if="task.type == 0">🪣</span>
        <span v-else-if="task.type == 1">🧑‍💻</span>
        <span v-else-if="task.type == 2">📦</span>
        <span v-else-if="task.type == 3">🆕</span>
        <span v-else-if="task.type == 4">📂</span>
        <v-tooltip theme="light" activator="parent">
          {{ task.sid }}#{{ task.name }}
        </v-tooltip>
      </span>
    </v-col>
    <v-col>
      <v-progress-linear
        :buffer-value="task.buffer"
        :stream="task.stream"
        :model-value="task.progress"
        :indeterminate="task.indeterminate"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["task"],
};
</script>