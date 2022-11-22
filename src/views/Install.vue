<template>
  <v-container>
    <h1 class="text-center my-10">
      grifpkg
      <v-chip label color="primary">CLI</v-chip>
    </h1>
    <v-card>
      <v-sheet color="black">
        <v-tabs grow color="primary" v-model="os">
          <v-tab value="linux">Linux</v-tab>
          <v-tab value="windows">Windows</v-tab>
          <v-tab value="macos">MacOS</v-tab>
        </v-tabs>
      </v-sheet>
      <v-list>
        <v-list-item v-for="(step, i) in steps" :key="i">
          <template v-slot:prepend>
            <v-avatar>
              {{ i + 1 }}
            </v-avatar>
          </template>
          <span v-html="step"></span>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar>
              {{ steps.length + 1 }}
            </v-avatar>
          </template>
          <span
            >Enjoy! Execute
            <pre>grif help</pre>
            from your terminal to get help
          </span>
        </v-list-item>
      </v-list>
    </v-card>
    <div class="text-center">
      <div class="my-5">
        <v-btn
          target="_blank"
          :href="this.url"
          v-if="os == 'windows'"
          :loading="!version"
          size="large"
          prepend-icon="mdi-download"
        >
          Download {{ version }}
        </v-btn>
        <cmd
          v-else
          overflow
          :loading="!version"
          :cmd="`wget ${this.url} -O /tmp/grifpkg && chmod +x /tmp/grifpkg && sudo /tmp/grifpkg upgrade`"
        >
          <template v-slot:prepend>
            <v-btn-toggle class="fill-height" style="overflow: visible" mandatory v-model="arch">
              <v-btn size="x-small" value="x32"> x32 </v-btn>
              <v-btn size="x-small" value="x64"> x64 </v-btn>
              <v-btn size="x-small" value="x64_arm"> ARM </v-btn>
            </v-btn-toggle>
          </template>
        </cmd>
      </div>
      <div>
        <v-btn target="_blank" href="https://nominal.es/discord" variant="text">
          Psst! Join our Discord
        </v-btn>
      </div>
      <div class="mt-2">
        <v-btn
          v-if="this.version"
          target="_blank"
          :href="`https://github.com/grifpkg/cli/releases/tag/${this.version}`"
          variant="plain"
        >
          GitHub
        </v-btn>
      </div>
    </div>
  </v-container>
</template>


<script>
import cmd from "../components/CMD.vue";
import UAParser from "ua-parser-js";
export default {
  components: {
    cmd,
  },
  data: () => ({
    os: null,
    version: null,
    arch: "x64",
  }),
  async mounted() {
    const parser = new UAParser();
    switch (parser.getOS()?.name) {
      case "Windows":
        this.os = "windows";
        break;
      case "iOS":
      case "Mac OS":
        this.os = "macos";
        break;
      default:
        this.os = "linux";
        break;
    }
    await this.fetchVersion();
  },
  watch: {
    os(v) {
      if (v == "macos") {
        this.arch = "x64_arm";
      } else {
        this.arch = "x64";
      }
    },
  },
  methods: {
    async fetchVersion() {
      this.version = null;
      const res = await fetch(
        "https://api.github.com/repos/grifpkg/cli/releases"
      );
      const json = await res.json();
      this.version = json[0].tag_name;
    },
  },
  computed: {
    url() {
      return `https://github.com/grifpkg/cli/releases/download/${
        this.version
      }/grif_${this.os}_${this.arch}${this.os == "windows" ? ".exe" : ""}`;
    },
    steps() {
      switch (this.os) {
        case "windows":
          return ["Open the downloaded file"];
        case "macos":
          return [
            "Run the installation CMD",
            "If unsuccessful, allow execution from the security preferences, then, re-run the command",
          ];
        default:
          return ["Run the installation CMD"];
      }
    },
  },
};
</script>